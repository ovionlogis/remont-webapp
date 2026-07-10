import Image from 'next/image';

import logo from './logo.png';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <Image
    alt="Логотип компании"
    className={className}
    height={logo.height / 3}
    src={logo}
    width={logo.width / 3}
  />
);

export default Logo;
