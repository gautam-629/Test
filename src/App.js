import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './Components';
import WhatsApp from './Components/Whatsapp/WhatsApp';
import {
	Home,
	About,
	ServicesPage,
	Career,
	CareerDetail,
	Blog,
	BlogDetail,
	Contact,
	TermsConditions,
} from './container';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PrivacyPolicy from './container/PrivacyPolicy/PrivacyPolicy';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, cacheTime: 0 } },
});

const App = () => {
	// const location = useLocation();
	const currentRoute = usePathname(); // Create a client
	return (
		<div className="App">
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<HelmetProvider>
						<Helmet>
							<title>HumanX</title>
						</Helmet>
						<Header currentRoute={currentRoute} />
						{/* Pass the current route */}

						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/about" element={<About />} />
							<Route exact path="/:slug" element={<ServicesPage />} />
							<Route exact path="/career" element={<Career />} />
							<Route
								exact
								path="/career-detail/:slug"
								element={<CareerDetail />}
							/>
							<Route exact path="/blogs" element={<Blog />} />
							<Route exact path="/blog-detail/:slug" element={<BlogDetail />} />
							<Route exact path="/contact-us" element={<Contact />} />
							<Route
								exact
								path="/terms-conditions"
								element={<TermsConditions />}
							/>
							<Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
						</Routes>

						<Footer />
						<WhatsApp />
					</HelmetProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
