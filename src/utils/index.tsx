import BlueLoading from "./lotties/blue-loading.json";

// colors
export const lightBeige = "#F5F5F5";
export const lightBlue = "#7EB4CE";
export const darkBlue = "#325D79";
export const darkOrange = "#F26627";
export const lightOrange = "#FF9813";
export const textGrey = "#525252";

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
