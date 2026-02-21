import React, {PropsWithChildren} from 'react';

type Props = {
    backgroundColor?: string;
    className?: string;
    width?: number;
}

const SectionLayout = ({backgroundColor, className, children, width = 1000}: PropsWithChildren<Props>) => (
    <section className={`${backgroundColor} p-4 lg:p-0`}>
        <section className={`mx-auto ${className} max-w-[1000px]`}>
            {children}
        </section>
    </section>
)

export default SectionLayout;