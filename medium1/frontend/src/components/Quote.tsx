// components/Quote.tsx


export const Quote = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-slate-200 p-6 md:p-12">
            <div className="max-w-xl text-center md:text-left text-2xl md:text-3xl font-bold">
                "The customer service I received was exceptional. The support team went
                above and beyond to address my concerns."
            </div>
            <div className="mt-4 text-lg md:text-xl font-semibold text-center md:text-left">
                Amulya Ratna
            </div>
            <div className="text-sm font-light text-slate-500">
                CEO | Daddy Corp
            </div>
        </div>
    );
};
