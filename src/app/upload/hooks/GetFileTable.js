import supabase from "@/app/hooks/supabase"

export const getFilesTable = async () => {
    const { data, error } = await supabase
        .from('files')
        .select('*')

    if (error) {
        console.log(error)
        return
    } else {
        console.log(data)
        return data
    }
}