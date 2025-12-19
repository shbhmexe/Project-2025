import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const ThemeToggler = () => {
  return (
    <AnimatedThemeToggler
      aria-label="theme toggler"
      className="flex items-center justify-center rounded-full cursor-pointer h-9 w-9 md:h-12 md:w-12 bg-accent text-accent-foreground border border-border shadow-sm hover:opacity-90"
    />
  );
};

export default ThemeToggler;
