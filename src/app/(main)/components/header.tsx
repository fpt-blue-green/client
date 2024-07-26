import { ModeToggle } from '@/components/mode-toggle';

const Header = () => {
  return (
    <header>
      <div className="container h-20">
        <div className="h-full flex items-center justify-between">
          <span>Logo</span>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
