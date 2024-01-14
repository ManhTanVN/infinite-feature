'use client'

import { useEffect , useState } from "react"
import type { ImagesResults, Photo } from "@/models/Images"
import { useInView } from "react-intersection-observer"
import { Spinner } from "./ui/Spinner"
import fetchImages from '@/lib/fetchImages'
import ImgContainer from "./ImgContainer"

export function LoadMore() {
    const [newPhotos, setNewPhotos] = useState<Photo[]>([]);

    const [nextPage, setNextPage] = useState(2)

    const {ref, inView} = useInView()

    const loadMoreImages = async () => {
        const newImages: ImagesResults | undefined = await fetchImages(`https://api.pexels.com/v1/curated/?page=${nextPage}&per_page=25`)
        if (newImages) {
            setNextPage(() => nextPage + 1)
            let spreadNewPhotos = [...newPhotos, ...newImages.photos]
            setNewPhotos(spreadNewPhotos)
            console.log('spreadNewPhotos: ',spreadNewPhotos)
        }
    }

    useEffect(() => {
        console.log('Scroll to the end')
        loadMoreImages()
    }, [inView])

    
    return (
        <>
            {newPhotos.length > 0 ? (
                newPhotos.map((photo,i) => (
                    <ImgContainer key={photo.id} photo={photo} />
                ))
            ): (<>No More Images</>)}
            <div 
                className="my-[200px] py-[30px] flex items-center flex-grow-0"
                ref={ref}
            >
            </div>
        </>
        
    )
}