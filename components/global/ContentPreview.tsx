import React, {FC} from 'react'
import {StaticImageData} from 'next/image'
import Link from 'next/link'
import {Badge, Card} from "@radix-ui/themes";

type OwnProps = {
    url: string
    title: string
    description: React.ReactNode
    image: StaticImageData
    date: string
    tags: string[]
}

const ContentPreview: FC<OwnProps> = ({
                                          url,
                                          title,
                                          description,
                                          image,
                                          date,
                                          tags,
                                      }) => {
    return <Link className="self-stretch" href={url} target="_blank">
        <Card className="flex flex-row justify-between items-center gap-8 rounded-lg p-4 bg-[var(--gray-3)]
                transition-all duration-500 shadow-sm shadow-amber-900 hover:cursor-pointer hover:bg-[var(--gray-5)]"
        >
            <section className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl">{title}</h3>
                <section className='text-sm text-[var(--gold-8)] md:text-md'>{description}</section>
                <img src={image?.src} alt="" className="rounded-md"/>

                <section className="flex flex-col gap-2 justify-between xl:items-center md:flex-row">
                    <section className="flex flex-row gap-2 font-medium xl:justify-end">
                        {tags.map(tag => (
                            <Badge key={`tag_${Math.random()}`} color='orange'>
                                {tag}
                            </Badge>
                        ))}
                    </section>
                    <span className="text-sm text-[var(--gold-8)]">{date}</span>
                </section>
            </section>
        </Card>
    </Link>
}

export default ContentPreview
