import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomeLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
