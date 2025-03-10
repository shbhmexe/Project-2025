import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';

const BlogPage = () => {
  const { theme } = useTheme();

  const getHeroBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-primary';
      case THEMES.PURPLE:
        return 'bg-purple-900';
      default:
        return 'bg-theme-primary';
    }
  };

  const getHeroTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  const getBlogBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'from-dark-primary to-dark-secondary';
      case THEMES.PURPLE:
        return 'from-purple-900 to-purple-700';
      default:
        return 'from-theme-primary to-theme-tertiary';
    }
  };

  const getBlogCardBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light';
      case THEMES.PURPLE:
        return 'bg-purple-800';
      default:
        return 'bg-white shadow-lg';
    }
  };

  const getTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  const getSecondaryTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-gray-300';
      default:
        return 'text-gray-600';
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: 'Building Community Through Shared Experiences',
      excerpt: 'Discover how shared experiences can strengthen community bonds and create lasting connections.',
      date: 'May 15, 2024',
      author: 'Shubham Shukla',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
    {
      id: 2,
      title: 'The Power of Inclusive Events',
      excerpt: 'Learn how inclusive events can bring diverse groups together and foster understanding.',
      date: 'May 10, 2024',
      author: 'Shubham Shukla',
      category: 'Events',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
    {
      id: 3,
      title: 'Digital Communities in the Modern Age',
      excerpt: 'Explore how technology is reshaping the way we build and maintain communities.',
      date: 'May 5, 2024',
      author: 'Shubham Shukla',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      title: 'Sustainable Community Practices',
      excerpt: 'Discover eco-friendly approaches to community building and event planning.',
      date: 'April 28, 2024',
      author: 'Shubham Shukla',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 5,
      title: 'The Art of Community Leadership',
      excerpt: 'Learn effective leadership strategies for building and nurturing thriving communities.',
      date: 'April 20, 2024',
      author: 'Shubham Shukla',
      category: 'Leadership',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
    {
      id: 6,
      title: 'Cultural Exchange Through Community Events',
      excerpt: 'Explore how community events can facilitate cultural exchange and understanding.',
      date: 'April 15, 2024',
      author: 'Shubham Shukla',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`${getHeroBackground()} py-10 md:py-16`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl font-bold ${getHeroTextColor()} mb-2 md:mb-4`}>
              Our Blog
            </h1>
            <p className={`text-xl ${getHeroTextColor()} opacity-90 max-w-2xl mx-auto`}>
              Insights, stories, and perspectives from our community
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className={`bg-gradient-to-b ${getBlogBackground()} py-10 md:py-16`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                className={`${getBlogCardBackground()} rounded-lg overflow-hidden shadow-lg group`}
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onLoad={(e) => {
                      console.log(`Image loaded successfully: ${post.title}`, e.target.src);
                    }}
                    onError={(e) => {
                      console.error(`Image failed to load: ${post.title}`, e.target.src);
                      e.target.src = `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(post.title)}`;
                      e.target.classList.add('bg-gray-200');
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${getSecondaryTextColor()}`}>{post.date}</span>
                    <span className={`text-xs px-2 py-1 bg-primary/10 text-primary rounded-full`}>{post.category}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${getTextColor()}`}>{post.title}</h3>
                  <p className={`${getSecondaryTextColor()} mb-4`}>{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${getSecondaryTextColor()}`}>By {post.author}</span>
                    <button className="text-primary hover:text-primary-dark transition-colors">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Stay updated with the latest blog posts, events, and community news.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 