import Image from 'next/image';

import logo from './logo.png';

const Logo = () => (
  <Image
    alt="Логотип компании"
    height={logo.height / 3}
    src={logo}
    width={logo.width / 3}
  />
);

export default Logo;
