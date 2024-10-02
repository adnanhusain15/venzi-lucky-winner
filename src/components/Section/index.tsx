import clsx from "clsx";
import { FC, HTMLAttributes, ReactNode } from "react";

interface ISectionProps extends HTMLAttributes<HTMLScriptElement> {
  containerClassName?: HTMLScriptElement["className"];
  backgroundImage?: ReactNode;
}

const Section: FC<ISectionProps> = ({
  children,
  containerClassName,
  backgroundImage,
  ...props
}) => {
  return (
    <section
      {...props}
      className={clsx(
        "w-full px-5 py-10 flex items-center justify-center",
        props.className
      )}
    >
      {backgroundImage}
      <div
        className={clsx(
          "sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full mx-auto flex",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
