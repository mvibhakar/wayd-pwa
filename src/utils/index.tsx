import BlueLoading from "./lotties/blue-loading.json";

// colors
export const lightBeige = "#F5F5F5";
export const lightBlue = "#1AC9FF";
export const darkBlue = "#0077FF";
export const darkOrange = "#FF4D00";
export const lightOrange = "#FFB11B";
export const textGrey = "#525252";
export const breakpoint = "1200px";

export const S3Key = "https://wayd-static.nyc3.digitaloceanspaces.com/";

// lottie animation options
export const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: BlueLoading,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
