import { CourseFullDTO } from "../course/course"

export interface CohorteFullDTO{
    id: number,
    name: string,
    date_init: string,
    date_end: string,
    cost_effective: number,
    cost_credit: number,
    course: CourseFullDTO
}


export interface CohorteCreateDTO{
    name: string,
    date_init: string,
    date_end: string,
    cost_effective: string,
    cost_credit: number,
    course_id: number
}

