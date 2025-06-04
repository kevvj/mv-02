import supabase from "@/app/hooks/supabase"
import { Excel, Pdf, Word } from "../components/DownloadItems"
import ImgItem from "../components/ImgViewer"

export const Load = ({ name }) => {

    const { data, error } = supabase.storage
        .from('files')
        .getPublicUrl(`allfiles/${name}`)

    return (
        <div onClick={console.log(name)}>
            {data.publicUrl.endsWith('.pdf') && <Pdf href={data.publicUrl} name={name}></Pdf>}
            {data.publicUrl.endsWith('.docx') && <Word href={data.publicUrl} name={name}></Word>}
            {data.publicUrl.endsWith('.csv') && <Excel href={data.publicUrl} name={name}></Excel>}
            {data.publicUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && <ImgItem src={data.publicUrl}></ImgItem>}
        </div>
    )
}


export const getFilesTable = async () =>{
    const {data, error} = await supabase
    .from('files')
    .select('*')

    if(error) {
        console.log(error)
        return
    }else{
        console.log(data)
        return data
    }
}

