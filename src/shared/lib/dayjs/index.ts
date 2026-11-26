import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Os plugins e o locale valem para toda instância: importe o dayjs sempre daqui
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

export { dayjs };
export type { Dayjs } from "dayjs";
