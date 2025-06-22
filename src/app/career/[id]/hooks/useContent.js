
import supabase from "@/app/hooks/supabase"

export const ContentSP = async () => {
    const { data, error } = await supabase
        .from('content')
        .select('*')

    if (error) {
        console.log(error)
        return
    }
    return data
}

export const CoursesSP = async () => {
    const { data, error } = await supabase
        .from('courses')
        .select('*')

    if (error) {
        console.log(error)
        return
    }
    return data
}

export const CareerSP = async () => {
    const { data, error } = await supabase
        .from('careers')
        .select('*')

    if (error) {
        console.log(error)
        return
    }
    return data
}
