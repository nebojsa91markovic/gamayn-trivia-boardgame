import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        primary: {
            100: "#F1FAEE",
            200: "#E9E8EB",
            300: "#02C39A",
            400: "#F72585",
            600: "#7209B7",
            800: "#3A0CA3"
        },
        secondary: {
            400: "#4CC9F0",
            600: "#4361EE"
        },
    },
    fonts: {
        body: "Yusei Magic, sans-serif",
        heading: "Balsamiq Sans, cursive"
    }
})

export default theme;