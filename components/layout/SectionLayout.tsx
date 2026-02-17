import React, {PropsWithChildren} from 'react';

type Props = {
    backgroundColor?: string;
    className?: string;
    width?: number;
}

const SectionLayout = ({backgroundColor, className, children, width}: PropsWithChildren<Props>) => (
    <section className={`${backgroundColor}`}>
        <section className={`mx-auto w-[${width ?? '1000'}px] ${className}`}>
            {children}
        </section>
    </section>
)

export default SectionLayout;