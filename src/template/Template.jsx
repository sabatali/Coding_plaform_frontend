import SideMenu from "./SideMenu";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useContext, useRef } from "react";
import BetaBanner from "../Components/BetaBanner";

function Template(props) {
  const contentRef = useRef();

  const scrollToTop = (e) => {
    e.preventDefault();
    contentRef.current.scrollTop = 0;
  };



  return (
    <div>
    <BetaBanner />
    <div className="grid grid-cols-6 md:grid-cols-12 gap-0 h-full">
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <SideMenu />
      </div>
      <div className="col-span-5 md:col-span-11 lg:col-span-10 h-full">
        <div className="relative">
          <NavBar />
          <div className="overflow-y-auto h-screen flex flex-col" ref={contentRef}>
            <div className="flex-shrink-0 p-5" style={{ marginTop: 72 }}>
              {props.children}
            </div>
            <Footer onScrollTop={scrollToTop} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Template;
