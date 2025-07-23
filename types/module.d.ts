declare module 'adminMFE/Header' {
    import { FC } from "react";

    export interface RemoteHeaderProps {
        initializeCounter?: number;
    }

    const Header: FC<RemoteHeaderProps>;
    export default Header;
}

// declare module 'remote/SomeOtherComponent' {
//     export const SomeOtherComponent: React.FC;
// }
