
import '../App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: 'HumanX Global - A Leading BPO and IT Outsourcing Company',
    description: 'HumanX is a leading BPO and IT outsourcing company, enabling organizational innovation and growth through advanced outsourcing and technology services.',
  }

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        {/* <head>
          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="HumanX is a leading BPO and IT outsourcing company, enabling organizational innovation and growth through advanced outsourcing and technology services."
            data-rh="true"
          />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:type" content="article" />
          <script src="https://kit.fontawesome.com/0db2d59c5a.js" crossOrigin="anonymous"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          <title>HumanX Global - A Leading BPO and IT Outsourcing Company</title>
        </head> */}
        <body>
          <div id="root">
            {children}
            <ToastContainer />
            </div>
        </body>
      </html>
    );
  }
  