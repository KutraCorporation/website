import { useTranslations } from "next-intl";

export default function Overview() {
    return (
        <>
            <header className="container py-16">
                <div className="bg-black text-white py-24">
                    <div className="container text-center mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-6">{useTranslations("about.cards.overview")('title')}</h1>
                    </div>
                </div>
            </header>
        </>
    );
}