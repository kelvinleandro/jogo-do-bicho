import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <Image
      src="https://discuss.wxpython.org/uploads/default/original/2X/6/6d0ec30d8b8f77ab999f765edd8866e8a97d59a3.gif"
      alt="loading"
      width={100}
      height={100}
      unoptimized
    />
  );
};

export default Loader;
