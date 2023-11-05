import { Dayjs } from "dayjs"

export interface acbDTO {
    data: Dayjs | null,
    whatAppened: string,
    whatInMyMind: string,
    beleve: number,
    emotions: string,
    emotionsRate: number,
    sensation: string,
    whatIdDo: string
}