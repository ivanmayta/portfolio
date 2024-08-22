"use client"
import { cn } from "@/lib/utils"
import { PinContainer } from "./ui/3d-pin"
import { motion } from "framer-motion"
import Image from "next/image"
import { data } from "../data"

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from "./ui/animated-modal"
import { CodeIcon } from "@/icons/CodeIcon"

export default function Projects({ className }) {
    const { projects } = data
    return (
        <article className={cn(className)}>
            <h1 className=" flex flex-row items-center text-2xl pb-12 lg:text-3xl lg:leading-tight tracking-tight font-medium text-black dark:text-white">
                <CodeIcon className="w-8 h-8 mr-2" />
                Proyectos
            </h1>
            <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
                {projects.map((project, key) => (
                    <Project key={key} project={project} />
                ))}
            </section>
        </article>
    )
}

function Project({ project }) {
    const { name, description, images, url, type, icon, highlights } = project
    return (
        <div>
            <Modal>
                <PinContainer title="/ui.aceternity.com">
                    <div className=" flex cursor-pointer basis-full overflow-hidden flex-col tracking-tight text-slate-100/50 sm:basis-1/2  w-full h-full p-4">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            {name}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                                {description}
                            </span>
                        </div>
                        <div className="flex flex-1 justify-center w-full aspect-square overflow-hidden rounded-lg mt-4 ">
                            <Image
                                src={images[1] || "/image/jisoo.webp"}
                                alt="jisoo"
                                width="500"
                                height="500"
                                className="  lg:w-full h-full sm:w-[70%] rounded-lg bg-gradient-to-br aspect-square"
                            ></Image>
                        </div>
                    </div>
                </PinContainer>

                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
                            {name}{" "}
                            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                {type}
                            </span>{" "}
                        </h4>
                        <div className="flex justify-center items-center">
                            {images &&
                                images.map((image, idx) => (
                                    <motion.div
                                        key={"images" + idx}
                                        style={{
                                            rotate: Math.random() * 20 - 10,
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        whileTap={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                                    >
                                        <Image
                                            src={image}
                                            alt="bali images"
                                            width="500"
                                            height="500"
                                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                        />
                                    </motion.div>
                                ))}
                        </div>

                        <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                            {highlights &&
                                highlights.map((highlight, idx) => (
                                    <div
                                        key={highlight.name}
                                        className="flex  items-center justify-center"
                                    >
                                        {highlight.icon}
                                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                            {highlight.name}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </ModalContent>

                    <ModalFooter className="gap-4">
                        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                            Cancel
                        </button>
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Book Now
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    )
}
