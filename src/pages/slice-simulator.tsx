// import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
// import { SliceZone } from "@prismicio/react";
// import { components } from "../slices";

// export default function SliceSimulatorPage() {
//   return  (
//     <SliceSimulator
//       sliceZone={(props) => <SliceZone {...props} components={components} />}
//     />
//   );
// }


// ⚠️ Trang Prismic Slice Simulator – chỉ dùng trong development
// 👉 Trang này sẽ không render trong production để tránh lỗi build

let SliceSimulatorPage: any;
let getStaticProps: any;

if (process.env.NODE_ENV === "production") {
  SliceSimulatorPage = function () {
    return null;
  };

  getStaticProps = async () => {
    return {
      notFound: true,
    };
  };
} else {
  const { SliceSimulator } = require("@slicemachine/adapter-next/simulator");
  const { SliceZone } = require("@prismicio/react");
  const { components } = require("../slices");

  SliceSimulatorPage = function () {
    return (
      <SliceSimulator
        sliceZone={(props: any) => <SliceZone {...props} components={components} />}
      />
    );
  };
}

export default SliceSimulatorPage;
export { getStaticProps };
