import TextAndImageSection from "@/components/TextAndImageSection"
import Image from "next/image"
import { useRef } from "react"

const MainPageTextAndImages = () => {
  const redZonePassRef = useRef<HTMLDivElement>(null)
  const july1980RonLombardandMoryMilesRef = useRef<HTMLDivElement>(null)
  const thirdWeekOfJanuary1981Ref = useRef<HTMLDivElement>(null)
  const midMay1981LeonardNelsonRef = useRef<HTMLDivElement>(null)
  const july161981WaterchemistryanalysisRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex w-full flex-col gap-12 text-lg *:min-h-[800px]">
      <div className="flex flex-wrap items-center justify-around gap-12 bg-white px-12 py-24">
        <p className="max-w-[800px]">
          From my late teens through my mid-20s, I worked for the U.S.
          Geological Survey, Water Resources Division in Tacoma, Washington.
          Luckily, I was involved in many water resource studies after Mount St.
          Helens&apos; gigantic eruption in May 1980. My partner, Colleen, and I
          met at the U.S.G.S. One of her fondest memories is performing a water
          chemistry analysis within days of the eruption on the Toutle River
          system, with one foot in the North Fork and one foot in the South.
        </p>
        <span className="flex flex-col gap-4 text-center text-sm">
          <Image
            src="/images/RedZonePass.jpg"
            alt="Red Zone Pass"
            width={1000}
            height={1000}
            priority={true}
          />
          <p>Red Zone Pass summer 1980 USGS K. Tanner</p>
        </span>
      </div>

      <div className="flex w-full flex-col-reverse bg-black md:flex-row">
        <span className="flex h-full flex-col gap-4 md:w-[60%]">
          <span className="relative h-full min-h-[400px]">
            <Image
              src="/images/July1980RonLombardandMoryMiles.jpg"
              alt="July 1980 Ron Lombard and Mory Miles surveying a cross section on the South Fork Toutle River near Four Corners. USGS K. Tanner"
              fill
              className="size-full object-cover"
            />
          </span>
          <p className="px-6 text-center text-sm text-white">
            July 1980 Ron Lombard and Mory Miles surveying a cross section on
            the South Fork Toutle River near Four Corners. USGS K. Tanner
          </p>
        </span>
        <span className="flex h-full flex-col items-center justify-center p-16 md:w-[40%]">
          <p className="max-w-[800px] text-white">
            Summer 1980 was very exciting all around the volcano, surveying
            cross-sections and establishing vertical control on all of the
            lahar-scoured river channels draining Mount St. Helens. I had to be
            patient and wait for our work to begin on the lakes created or
            affected by the blast, work that required helicopter rides. That day
            finally arrived in January 1981.
          </p>
        </span>
      </div>

      <div className="flex w-full flex-col bg-black md:flex-row">
        <span className="flex h-full items-center justify-center p-16 md:w-[40%]">
          <p className="max-w-[800px] text-white">
            1981 brought busy times for the U.S.G.S. Tacoma office, with
            continued monitoring and measurement of all streams and rivers,
            chemical analyses on the many nearby lakes, study and test drilling
            on the debris avalanche deposits blocking the fast-filling Spirit,
            Coldwater, and South Fork Castle Creek Lakes…and best of all,
            bathymetric surveys of those three lakes and more.
          </p>
        </span>
        <span className="flex h-full flex-col gap-4 md:w-[60%]">
          <span className="relative h-full min-h-[400px]">
            <Image
              src="/images/ThirdWeekOfJanuary1981.jpg"
              alt="Third week of January 1981  First trip to Coldwater Lake to perform preliminary bathymetric survey.  USGS K. Tanner"
              fill
              className="size-full object-cover"
            />
          </span>
          <p className="px-6 text-center text-sm text-white">
            Third week of January 1981 First trip to Coldwater Lake to perform
            preliminary bathymetric survey. USGS K. Tanner
          </p>
        </span>
      </div>

      <div className="flex w-full flex-col-reverse bg-black md:flex-row">
        <span className="flex h-full flex-col gap-4 md:w-[60%]">
          <span className="relative h-full min-h-[400px]">
            <Image
              src="/images/MidMay1981LeonardNelson.jpg"
              alt="Mid-May 1981  Leonard Nelson in aluminum boat in Bear Cove, West Arm of Spirit Lake with debris avalanche hummocks. Microwave trisponder range finder in boat for use in bathymetric mapping.  USGS K. Tanner"
              fill
              className="size-full object-cover"
            />
          </span>
          <p className="px-6 text-center text-sm text-white">
            Mid-May 1981 Leonard Nelson in aluminum boat in Bear Cove, West Arm
            of Spirit Lake with debris avalanche hummocks. Microwave trisponder
            range finder in boat for use in bathymetric mapping. USGS K. Tanner
          </p>
        </span>
        <span className="flex h-full flex-col items-start justify-center gap-4 p-16 text-white md:w-[40%]">
          <p className="">
            Over the next 100+ days, from March 20 into July, I would like to
            share photographs, maps, charts, research links, newspaper
            clippings, and stories with you in daily presentations about
            Lawetlat&apos;la. I will always try to share a photograph (or
            several) of that day&apos;s volcanic happenings, taken exactly 45
            years ago. If no &quot;photograph of the day&quot; exists, then I
            will include artwork, a postcard, a map, or perhaps a camp badge.
            The historic pre-eruption photographs and story topics bounce around
            a bit, often adding background to the &quot;photograph of the
            day&quot;, to a news clipping story, or to that day&apos;s
            introductory slide.
          </p>
          <p>
            The 59 pre-eruption presentations focus mainly on U.S.G.S.
            geologists and volcanologists monitoring phreatic eruptions and the
            deformation of the volcano&apos;s north flank, historic photographs,
            maps, and legends. After Day 60, in addition to daily events, the
            presentations will feature each of the six distinct volcanic
            processes that occurred on May 18. Then, superelevations of
            high-velocity lahars, the &quot;Stranded Logs&quot;, and five
            additional eruptions and pumiceous pyroclastic flows in summer and
            fall 1980.
          </p>
          <p>And of course, the Spirit Lake Yacht Club stories…</p>
        </span>
      </div>

      <div className="flex w-full flex-col bg-black md:flex-row">
        <span className="flex h-full flex-col justify-center gap-4 p-16 text-start text-white md:w-[40%]">
          <p className="">
            Sandy Embrey, Norm Dion, Len Nelson, Steve Sumioka, Gary Turney, Ron
            Lombard, Jim Ebbert, Rick Wagner, Dave Kresch, my boss Charley
            Swift, Associate District Chief P.J. Carpenter, and Ken Tanner.
          </p>
          <p>
            We still refer to ourselves as The Spirit Lake Yacht Club.
            You&apos;ll read our stories and hydrologic research and see our
            photographs from around the volcano. Many other Tacoma WRD
            hydrologists that you will meet are sadly gone, or are in their 80s
            and even 90s and I&apos;m hustling to get their stories too. I am
            especially excited to share Sandy&apos;s and Gary&apos;s slides.
            Stunning, never-seen-before photos of the effects of the blast. A
            big U.S.G.S. 40th anniversary reunion scheduled for May 2020 at
            Toutle Lake High School was cancelled by the pandemic, and we
            eagerly await the upcoming 45th reunion this spring 2025.
          </p>
          <p>
            The sequence and timing of events in the first 10 minutes of the May
            18 eruption were very complex, and I&apos;m continually learning
            more. Exploring the Mount St. Helens National Volcanic Monument is
            fantastic, and countless happy days and nights have been spent there
            since the eruption. From hearing the amazing swoosh of the
            Nighthawks at dusk to picking chunks of pumice out of my hair. And I
            still have a research project up my sleeve regarding the many
            affected and newly-created lakes.
          </p>
          <p>- Ken Tanner</p>
        </span>
        <span className="flex h-full flex-col gap-4 md:w-[60%]">
          <span className="relative h-full min-h-[400px]">
            <Image
              src="/images/July201982NPDion.jpg"
              alt="July 20, 1982  N.P. Dion and S.S. Embrey reading Dissolved Oxygen levels at Deadmans Lake, 12.7 miles NNE of the vent and just beyond the blast zone. Deadman's served as the control in the lakes study.  USGS S.S. Embrey"
              fill
              className="size-1/2 object-cover"
            />
          </span>
          <p className="px-6 text-center text-sm text-white">
            July 20, 1982 N.P. Dion and S.S. Embrey reading Dissolved Oxygen
            levels at Deadmans Lake, 12.7 miles NNE of the vent and just beyond
            the blast zone. Deadman's served as the control in the lakes study.
            USGS S.S. Embrey
          </p>
        </span>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-4">
        <span className="relative min-h-[400px] w-1/2">
          <Image
            src="/images/July161981Waterchemistryanalysis.jpg"
            alt="July 16, 1981  Chemical analysis on Spirit Lake's East Arm. USGS Water Resources Division's Sandy Embrey and Gary Turney hemmed in by log mat in 14-foot aluminum boat.  USGS Lyn Topinka"
            height={1000}
            width={1000}
            className="object-cover"
          />
        </span>
        <p className="max-w-1/2 text-center text-sm text-white">
          July 16, 1981 Chemical analysis on Spirit Lake&apos;s East Arm. USGS
          Water Resources Division&apos;s Sandy Embrey and Gary Turney hemmed in
          by log mat in 14-foot aluminum boat. USGS Lyn Topinka
        </p>
      </div>
    </div>
  )
}

export default MainPageTextAndImages
