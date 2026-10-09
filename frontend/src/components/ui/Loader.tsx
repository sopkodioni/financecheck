const Loader = () => {
    return (
        <div className="flex justify-center m-1.5">
            <div className="flex gap-2" role="status" aria-label="Loading">
                <span
                    className="size-3 animate-bounce rounded-full bg-zinc-500 dark:bg-indigo-300"
                    aria-hidden="true"
                ></span>
                <span
                    className="size-3 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.2s] dark:bg-indigo-300"
                    aria-hidden="true"
                ></span>
                <span
                    className="size-3 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.4s] dark:bg-indigo-300"
                    aria-hidden="true"
                ></span>
            </div>
        </div>
    )
}

export default Loader