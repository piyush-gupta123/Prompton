import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metaData = {
  title: "Prompton",
  description: "Discover and share AI prompts for ease",
};

const layout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
