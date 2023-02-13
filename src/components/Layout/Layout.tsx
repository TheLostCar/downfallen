import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>

            {/* <main className="flex flex-col"> */}
            {children}
            {/* </main> */}

        </>
    );
}

export default Layout;