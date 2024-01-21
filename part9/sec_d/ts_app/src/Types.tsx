export interface Header {
    name: string;
}

// export interface CoursePart {
//     name: string;
//     exerciseCount: number;
// }

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CourseInterface extends CoursePartBase {
    description: string;
}
  
interface CoursePartBasic extends CourseInterface {
    kind: "basic";
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}
  
interface CoursePartBackground extends CourseInterface {
    backgroundMaterial: string;
    kind: "background";
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;