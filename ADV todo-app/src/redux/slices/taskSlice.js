import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/localStorage';
import { getWeatherByLocation } from '../../api/weatherApi';

export const fetchWeatherForTask = createAsyncThunk(
  'tasks/fetchWeatherForTask',
  async (location, { rejectWithValue }) => {
    try {
      const weatherData = await getWeatherByLocation(location);
      return weatherData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = loadState('tasks') || {
  tasks: [],
  weatherData: {},
  loading: false,
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now().toString(),
        text: action.payload.text,
        priority: action.payload.priority || 'Medium',
        completed: false,
        createdAt: new Date().toISOString(),
        location: action.payload.location || ''
      });
      saveState('tasks', state);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveState('tasks', state);
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.priority = priority;
      }
      saveState('tasks', state);
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      saveState('tasks', state);
    },
    clearTasks: (state) => {
      state.tasks = [];
      saveState('tasks', state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherForTask.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData[action.meta.arg] = action.payload;
      })
      .addCase(fetchWeatherForTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addTask, deleteTask, updateTaskPriority, toggleTaskComplete, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;