import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Хлебные крошки">
    <ol className="breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li
            key={item.label}
            className="breadcrumbs__item"
          >
            {item.href && !isLast ? (
              <Link
                className="breadcrumbs__link"
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="breadcrumbs__link"
                data-current="true"
              >
                {item.label}
              </span>
            )}

            {!isLast ? <ChevronRight className="breadcrumbs__separator" /> : null}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
