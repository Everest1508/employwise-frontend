import { Link } from "react-router-dom";

interface BreadcrumbProps {
  paths: { name: string; link?: string }[];
}

const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav className="mb-4">
      <ul className="flex text-gray-600 space-x-2 text-sm">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {path.link ? (
              <Link to={path.link} className="hover:text-blue-500">
                {path.name}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{path.name}</span>
            )}
            {index < paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
