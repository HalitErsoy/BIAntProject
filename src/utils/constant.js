export const SOURCE_DATA = [
    { name: 'helpdesk.kocsistem.com.tr' },
    { name: 'kocsistemdev.service-now.com' },
    { name: 'kocsistem.service-now.com' },
];
 

export const SOURCE_DATA_MAP = {
    "datasource1": {
        source: "helpdesk.kocsistem.com.tr",
        destination: "KSDWHSYNC3 - SYNC SB"
    },
    "datasource2": {
        source: "helpdesk.kocsistem.com.tr",
        destination: "KSDWHSYNC3 - SYNC ODS"
    },
    "datasource3": {
        source: "kocsistem.service-now.com",
        destination: "KSDWHSYNC3 - SYNC SNOW"
    },
    "datasource4": {
        source: "kocsistemdev.service-now.com",
        destination: "KSDWHSYNC3 - SYNC SNOW DEV"
    }
};