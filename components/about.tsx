"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  X,
  FolderOpen,
  FileText,
  Star,
  Target,
  Zap,
  Users,
  Activity,
  BookOpen,
  Clock,
  Heart,
  Flame, // 🔥 모토 아이콘용 추가
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"

// ---- 타입 정의 ----
type Project = {
  title: string
  period: string
  description: string
  tags: string[]
  coverImage: string
  pdfName: string
  pdfUrl: string
}

type ResumeItem = {
  period: string
  title: string
  subtitle?: string
  description?: string
}

type ResumeActivity = {
  period: string
  title: string
  details: string[]
}

type Resume = {
  personal: { label: string; value: string }[]
  education: ResumeItem[]
  experience: ResumeItem[]
  activities: ResumeActivity[]
  certificates: { date: string; name: string }[]
}

type Highlight = {
  title: string
  description: string
}

type TimelineItem = {
  period: string
  title: string
  description: string
}

type CourseItem = {
  name: string
  detail: string
}

type Stat = {
  label: string
  value: string
  sub: string
}

type ServiceItem = {
  title: string
  description: string
}

type TechCategory = {
  category: string
  items: string
}

type Testimonial = {
  name: string
  role: string
  quote: string
}

type LifePhoto = {
  image: string
  caption: string
}

type AboutLabels = {
  statsSectionTitle: string
  contactTitle: string
  whatIDoTitle: string
  techToolsTitle: string
  keySkillsTitle: string
  highlightsTitle: string
  resumeTitle: string
  educationTitle: string
  experienceTitle: string
  activityTitle: string
  certificateTitle: string
  interestsTitle: string
  interestMottoTitle: string
  timelineTitle: string
  coursesTitle: string
  testimonialTitle: string
  lifeMomentsTitle: string
  projectsTitle: string
  projectTagsLabel: string
  projectPdfNote: string
}

type AboutInfo = {
  title: string
  subtitle: string
  background: { image: string; video: string; color: string; opacity: number }
  profileName: string
  profileTitle: string
  profileSummary: string
  profileImage: string
  contact: { label: string; value: string }[]
  skills: { title: string; level: "상" | "중" | "하"; description: string }[]
  resume: Resume
  projects: Project[]
  highlights: Highlight[]
  interests: string[]
  interestMotto: string
  timeline: TimelineItem[]
  courses: CourseItem[]
  stats: Stat[]
  services: ServiceItem[]
  techStack: TechCategory[]
  testimonials: Testimonial[]
  lifePhotos: LifePhoto[]

  whatIDoNote: string
  resumeCaption: string
  projectsCaption: string

  labels: AboutLabels
}

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  const defaultInfo = {
    title: "포트폴리오",
    subtitle: "도시를 관찰하고, 데이터를 읽고, 더 나은 공간을 고민하는 도시계획·부동산학 전공자입니다.",
    background: {"image":"","video":"","color":"","opacity":0.08},
    profileName: "김민수",
    profileTitle: "단국대학교 도시계획부동산학부",
    profileSummary: "도시재생과 주택시장 분석에 관심을 두고 있으며, 데이터 기반의 분석과 현장 조사 경험을 함께 결합하여 변화의 흐름을 이해하고자 노력하고 있습니다. 또한 팀 프로젝트와 동아리 활동을 통해 다양한 사람들과 목표를 공유하고 협업하는 과정을 경험하며, 의견을 조율하고 결과를 만들어 가는 역량을 키워왔습니다.",
    profileImage: "/uploads/about-profile-1763791766014.jpeg",
    contact: [{"label":"Email","value":"example@naver.com"},{"label":"Phone","value":"010-0000-0000"},{"label":"Address","value":"경기 용인시 수지구 죽전동"},{"label":"GitHub / Blog","value":"https://github.com/your-id"}],
    stats: [{"label":"전공 프로젝트","value":"10+","sub":"수업·팀 과제 포함"},{"label":"관심 분야 리포트","value":"20+","sub":"주택·도시재생·환경 등"},{"label":"교육 봉사","value":"5년+","sub":"아이사랑 동아리 활동 및 고교 시절 멘토링 봉사"}],
    services: [{"title":"도시·부동산 리서치","description":"정책 자료, 통계, 논문과 현장 자료를 종합해 이슈의 흐름을 정리하고 통찰력을 제공합니다."},{"title":"기초 데이터 분석 & 시각화","description":"실거래가, 인구구조, 상권 데이터 등을 데이터 기반 분석 기법으로 구조화하고 해석합니다."},{"title":"기획·발표 및 협업","description":"팀 프로젝트에서 역할 분담, 일정 관리, 발표 자료 제작을 맡으며 구성원들과 조율합니다."}],
    skills: [{"title":"도시·부동산 리서치","level":"상","description":"정책 문헌과 통계 자료를 폭넓게 검토하여 흐름을 파악하고, 이를 토대로 핵심적인 시사점을 도출합니다."},{"title":"데이터 분석","level":"중","description":"엑셀과 기본 통계를 활용하여 실거래가, 인구구조 등 데이터를 정리·시각화합니다."},{"title":"협업 & 커뮤니케이션","level":"상","description":"동아리 임원 경험을 바탕으로 일정 조율, 회의 진행, 역할 분담에 익숙합니다."}],
    techStack: [{"category":"데이터 & 분석","items":"실거래가 데이터 · 인구통계 · 상권 · 토지이용 변화"},{"category":"도구 & 소프트웨어","items":"PowerPoint · Word · Excel · ArcGIS"},{"category":"관심 기술","items":"Python(기초 학습 중) · 데이터 시각화 · 공간 데이터"}],
    resume: {"personal":[{"label":"이름","value":"김민수"},{"label":"생년월일","value":"2001.04.18"},{"label":"주소","value":"경기 용인시 수지구 죽전동"},{"label":"Email","value":"kimms4335@naver.com"}],"education":[{"period":"2017.03 ~ 2020.02","title":"성원고등학교","subtitle":"자연계열"},{"period":"2021.03 ~ 2027.02(졸업 예정)","title":"단국대학교 죽전캠퍼스","subtitle":"도시계획부동산학부                        "}],"experience":[{"period":"2024.03 ~ 2024.06","title":"토지이용계획_지역 답사","description":"명동 & 판교 답사를 통해 도시계획은 시민의 삶의 질 향상을 추구해야 한다는 가치관 확립"},{"period":"2024.03 ~ 2024.06","title":"부동산입지_상권 분석","description":"FC 양재점과 교대점의 입지·유동인구·상권 특성을 비교 분석하며, 동일 브랜드라도 배후 수요의 특성과 경쟁 환경에 따라 매출이 달라진다는 점을 확인"},{"period":"2024.09 ~ 2024.12","title":"세운상가_지역 답사 및 재건 방안 구상","description":"세운상가 현장 답사를 통해 현장 분석을 진행하였다. 분석된 내용을 토대로 지역 보존과 개발을 조화시킬 수 있는 전략으로 구역별 재건 계획과 공공임대·지식산업 연계 방안을 제시"},{"period":"2025.09 ~ 현재","title":"GIS와 도시공간분석","description":"인구·상권·주거 등 도시 데이터를 지도 기반으로 시각화하고 이에 대한 공간적 패턴을 해석함으로써 도시 문제에 대한 정책적 시사점을 도출하는 능력 함양"}],"activities":[{"period":"2024.03 ~ 현재","title":"교육봉사 동아리(아이사랑) 집행부","details":["• 초·중등 대상 학습 지도 및 놀이 프로그램 진행","• 부원 간 친목 도모 및 행사 기획","• 동아리와 지역아동센터 간 연결"]},{"period":"2025.03 ~ 현재","title":"독서 토론 모임","details":["• 선정 도서에 대한 의견 정리 및 토론 참여","• 서로 다른 관점에 대해 비교·조율하며 합의 도출","• 비판적 사고와 소통 역량 강화"]}],"certificates":[{"date":"2025.06(예정)","name":"도시계획기사 자격증 취득"},{"date":"2025.07(예정)","name":"교통기사 자격증 취득"},{"date":"2027.03(목표)","name":"법학전문대학원 입학"}]},
    projects: [{"title":"세운상가 프로젝트","period":"도시개발론","description":"세운상가의 문제점에 대해 조사한 뒤 구역별 재생 방안을 제시한 팀 프로젝트.","tags":["#세운상가","#도시재생","#현장조사"],"coverImage":"/uploads/project-cover-1763802863927.png","pdfName":"세운상가 리포트","pdfUrl":"https://naver.me/5asLLhzz"},{"title":"KFC 교대점과 양재점에 대한 상권 분석","period":"부동산입지","description":"KFC 교대점 및 양재점을 대상으로 상권·접근성·수요를 분석하여 입지 적합성을 평가한 팀 프로젝트.","tags":["#KFC","#교대점","#양재점","#입지","#상권분석"],"coverImage":"/uploads/project-cover-1763804507678.png","pdfName":"KFC 교대점 & 양재점 분석 리포트","pdfUrl":"https://naver.me/xI100N0A"},{"title":"서울 고덕아르테온 아파트 실거래가 분석","period":"토지론입문","description":"국토부 실거래가 데이터를 활용하여 고덕동 주요 단지의 가격 추세와 9호선 연장, 비즈밸리 조성 등 개발 호재의 영향을 분석한 리포트.","tags":["#실거래가","#아파트분석","#고덕아르테온"],"coverImage":"/uploads/project-cover-1763802189180.png","pdfName":"고덕아르테온 분석 리포트","pdfUrl":"https://naver.me/GScEabVD"},{"title":"일본 주택 문화 및 한·일 고령사회 주거정책 비교","period":"주택론입문","description":"한국과 일본의 고령자 주거지원, 빈집 문제, 농촌 활성화 정책을 비교하여 시사점을 정리한 팀 프로젝트.","tags":["#고령사회","#주거정책","#비교연구"],"coverImage":"/uploads/project-cover-1763802531639.png","pdfName":"일본 주택 문화와 주택 시장 리포트","pdfUrl":"https://naver.me/FhfJJryG"},{"title":"새 프로젝트","period":"2024","description":"프로젝트 설명을 입력하세요.","tags":["#프로젝트"],"coverImage":"","pdfName":"","pdfUrl":""},{"title":"새 프로젝트","period":"2024","description":"프로젝트 설명을 입력하세요.","tags":["#프로젝트"],"coverImage":"","pdfName":"","pdfUrl":""}],
    highlights: [{"title":"현장을 보는 시각","description":"지역을 직접 답사하며 지도나 수치로는 드러나지 않는 생활권 특성과 공간 활용 방식을 관찰합니다.\n더 나아가, 현장에서 얻은 상황적 맥락을 데이터 분석과 연계하여 대안을 제시합니다."},{"title":"꾸준함과 책임감","description":"동아리와 팀 프로젝트에서 맡은 역할을 끝까지 책임지고 수행해 왔습니다."},{"title":"소통 능력","description":"상대방의 입장과 필요를 먼저 이해하며 협력 방향을 조율할 수 있기 때문에, 다양한 의견이 공존하는 상황에서도 효과적으로 문제를 해결할 수 있습니다."}],
    interests: ["#도시재생","#주택시장","#고령사회","#보행친화도시","#상권분석","#도시계획"],
    interestMotto: "\"최고보다 최선을\"",
    timeline: [{"period":"2017.03 ~ 2020.02","title":"성원고등학교","description":"학업과 학생회 활동을 병행하며 교내 행사 기획과 운영을 맡아 책임감을 키움."},{"period":"2021.03 ~ 현재","title":"단국대학교 도시계획부동산학부","description":"도시계획·부동산 전공 지식과 함께, 팀 프로젝트 및 현장에 대한 경험을 쌓는 중."},{"period":"2021.07 ~ 2023.01","title":"육군 병장 만기전역","description":"다양한 사람들과 공동 생활을 하며 배려·협업의 중요성을 배우고, 맡은 임무를 끝까지 수행하는 책임감을 키움"},{"period":"2023 ~ 현재","title":"아이사랑 동아리","description":"교육봉사를 통해 사람들과 소통하고 협업하는 경험을 지속적으로 확장."}],
    courses: [{"name":"GIS와 도시공간분석","detail":"공간 데이터를 활용한 분석 및 시각화 기초 학습."},{"name":"토지론입문","detail":"토지의 경제적 특성과 제도, 이용 방식에 대한 이해."},{"name":"부동산입지","detail":"주택시장, 상업용 부동산 시장의 구조와 가격 형성 요인 학습."},{"name":"도시재생론","detail":"쇠퇴 지역의 재생 전략과 국내외 사례 분석."},{"name":"토지이용계획","detail":"공간을 효율적으로 관리하기 위한 토지이용 구조와 규제 체계에 대한 분석."},{"name":"도시계획","detail":"토지이용, 교통, 주거, 환경 등 다양한 요소를 종합하여 도시공간을 설계하는 원리와 계획 체계에 대한 이해."},{"name":"AI와 도시계획","detail":"인공지능을 기반으로 한 장래 도시공간에 대한 설계."},{"name":"도시개발론","detail":"도시 개발의 이론과 제도, 사업 절차에 대한 이해 & 공공과 민간의 역할에 대한 탐구."},{"name":"부동산 사법","detail":"부동산 거래와 권리 관계를 규율하는 법적 원칙에 대한 이해."},{"name":"교통계획","detail":"도시 내 이동 수요와 교통 흐름을 분석하는 방법 & 지속 가능한 도시교통 구조를 설계하는 원리에 대한 이해."},{"name":"부동산 조세","detail":"부동산에 대해 부과되는 조세 체계에 대한 이해 & 부동산 시자의 공정성과 효율성을 확보하는 과세 정책 방향에 대한 탐구."},{"name":"부동산 프롭테크","detail":"ICT·빅데이터·AI 등 부동산 시장의 혁신을 이끌어 나가는 기술에 대한 이해."},{"name":"환경관리, 국토 및 지역계획 등","detail":"다양한 전공 과목을 수강함."}],
    testimonials: [{"name":"동아리 부원","role":"아이사랑","quote":"편하게 다가가 고민을 털어놓을 수 있는 선배이자 필요할 때는 방향을 잡아주는 책임감 있는 집행부."},{"name":"팀 프로젝트 팀원","role":"전공 수업 & 교양 수업","quote":"의견을 조율하며 팀 분위기를 안정시키는 사람, 맡은 일은 끝까지 책임지는 믿음직한 팀원."},{"name":"전공과목에 대한 교수님","role":"수업 피드백","quote":"도시개발론이라는 과목에 늘 진지한 태도로 임하며 성실하게 참여한 학생이고, 그런 꾸준함 덕분에 기억에 남는 학생"}],
    lifePhotos: [{"image":"/uploads/life-photo-1763800743577.png","caption":"부동산입지_KFC 답사"},{"image":"/uploads/life-photo-1763800702862.jpg","caption":"도시개발론_세운상가 답사"},{"image":"/uploads/life-photo-1763800381876.png","caption":"토지이용계획_판교 답사"},{"image":"/uploads/life-photo-1763800767781.jpg","caption":"교육봉사 동아리_장학금 행사"},{"image":"/uploads/life-photo-1763800945638.jpg","caption":"교육봉사 동아리_활동"},{"image":"/uploads/life-photo-1763801238983.jpg","caption":"교육봉사 동아리_학교 투어"}],
    whatIDoNote: "Ability",
    resumeCaption: "주요 학력과 경험을 한 눈에 볼 수 있도록 정리했습니다.",
    projectsCaption: "수업·과제·개인 프로젝트 중 보여주고 싶은 작업을 정리한 영역입니다.",
    labels: {"statsSectionTitle":"경험","contactTitle":"CONTACT","whatIDoTitle":"What I Do","techToolsTitle":"TECH & TOOLS","keySkillsTitle":"KEY SKILLS","highlightsTitle":"핵심 역량","resumeTitle":"자기 PR","educationTitle":"학력","experienceTitle":"전공 관련 경험","activityTitle":"활동 & 대외 경험","certificateTitle":"자격 및 기타","interestsTitle":"관심 분야","interestMottoTitle":"모토","timelineTitle":"타임라인","coursesTitle":"수강 과목 & 학습 주제","testimonialTitle":"함께한 사람들이 본 나","lifeMomentsTitle":"Life & Moments","projectsTitle":"Projects","projectTagsLabel":"태그 (공백으로 구분):","projectPdfNote":"* 네이버 MYBOX, 구글드라이브 등 공유 링크도 그대로 넣으면 됩니다."}
  }

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultInfo)
  const [backgroundData, setBackgroundData] =
    useState(defaultInfo.background)

  // --------- 데이터 로딩 ----------
  useEffect(() => {
    const saved = getData("about-info") as Partial<AboutInfo> | null
    if (saved) {
      const savedProjects = (saved.projects || defaultInfo.projects) as any[]
      const normalizedProjects: Project[] = savedProjects.map((p) => ({
        title: p.title ?? "",
        period: p.period ?? "",
        description: p.description ?? "",
        tags: p.tags ?? [],
        coverImage: p.coverImage ?? "",
        pdfName: p.pdfName ?? "",
        pdfUrl: p.pdfUrl ?? "",
      }))

      const merged: AboutInfo = {
        ...defaultInfo,
        ...saved,
        background: { ...defaultInfo.background, ...(saved.background || {}) },
        resume: { ...defaultInfo.resume, ...(saved.resume || {}) },
        projects: normalizedProjects,
        highlights: saved.highlights || defaultInfo.highlights,
        interests: saved.interests || defaultInfo.interests,
        timeline: saved.timeline || defaultInfo.timeline,
        courses: saved.courses || defaultInfo.courses,
        stats: saved.stats || defaultInfo.stats,
        services: saved.services || defaultInfo.services,
        techStack: saved.techStack || defaultInfo.techStack,
        testimonials: saved.testimonials || defaultInfo.testimonials,
        lifePhotos: saved.lifePhotos || defaultInfo.lifePhotos,
        whatIDoNote: saved.whatIDoNote || defaultInfo.whatIDoNote,
        resumeCaption: saved.resumeCaption || defaultInfo.resumeCaption,
        projectsCaption: saved.projectsCaption || defaultInfo.projectsCaption,
        labels: saved.labels || defaultInfo.labels,
        interestMotto: saved.interestMotto || defaultInfo.interestMotto,
      }

      setAboutInfo(merged)
      if (saved.background) setBackgroundData(saved.background)
    }

    const savedBg = getData("about-background") as
      | { image: string; video: string; color: string; opacity: number }
      | null
    if (savedBg) setBackgroundData(savedBg)
  }, [isEditMode])

  const updateAboutInfo = (key: keyof AboutInfo, value: any) => {
    const newInfo = { ...aboutInfo, [key]: value }
    setAboutInfo(newInfo)
    saveData("about-info", newInfo)
  }

  const updateLabels = (partial: Partial<AboutLabels>) => {
    const newLabels = { ...aboutInfo.labels, ...partial }
    updateAboutInfo("labels", newLabels)
  }

  // --------- 리스트 항목 업데이트/추가/삭제 유틸 ----------

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...aboutInfo.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    updateAboutInfo("projects", newProjects)
  }

  const addProject = () => {
    const newProjects: Project[] = [
      ...aboutInfo.projects,
      {
        title: "새 프로젝트",
        period: "2024",
        description: "프로젝트 설명을 입력하세요.",
        tags: ["#프로젝트"],
        coverImage: "",
        pdfName: "",
        pdfUrl: "",
      },
    ]
    updateAboutInfo("projects", newProjects)
  }

  const removeProject = (index: number) => {
    updateAboutInfo(
      "projects",
      aboutInfo.projects.filter((_, i) => i !== index),
    )
  }

  const updateProjectTags = (index: number, tagsString: string) => {
    const tags = tagsString
      .split(" ")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    updateProject(index, "tags", tags)
  }

  const updateResume = (
    section: keyof Resume,
    index: number,
    field: string,
    value: string,
    detailIndex?: number,
  ) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))

    if (section === "activities" && typeof detailIndex === "number") {
      newResume.activities[index].details[detailIndex] = value
    } else {
      ;(newResume as any)[section][index][field] = value
    }

    updateAboutInfo("resume", newResume)
  }

  // 🔧 이력서 각 섹션 추가/삭제
  const addPersonalField = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.personal.push({ label: "항목", value: "내용을 입력하세요." })
    updateAboutInfo("resume", newResume)
  }

  const removePersonalField = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.personal.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addEducation = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.education.push({
      period: "연도 ~ 연도",
      title: "학교 / 과정",
      subtitle: "전공 / 계열",
    })
    updateAboutInfo("resume", newResume)
  }

  const removeEducation = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.education.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addExperience = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.experience.push({
      period: "연도 ~ 연도",
      title: "경험 제목",
      description: "설명을 입력하세요.",
    })
    updateAboutInfo("resume", newResume)
  }

  const removeExperience = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.experience.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addActivity = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities.push({
      period: "연도 ~ 연도",
      title: "활동명",
      details: ["활동 내용을 입력하세요."],
    })
    updateAboutInfo("resume", newResume)
  }

  const removeActivity = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addActivityDetail = (activityIndex: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities[activityIndex].details.push("추가 내용을 입력하세요.")
    updateAboutInfo("resume", newResume)
  }

  const removeActivityDetail = (activityIndex: number, detailIndex: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities[activityIndex].details.splice(detailIndex, 1)
    updateAboutInfo("resume", newResume)
  }

  const addCertificate = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.certificates.push({
      date: "연도.월.일",
      name: "자격증 / 수료증 이름",
    })
    updateAboutInfo("resume", newResume)
  }

  const removeCertificate = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.certificates.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  // 🔧 강점, 타임라인, 과목, 관심, 후기, 사진 등 추가/삭제
  const addHighlight = () => {
    const newList = [
      ...aboutInfo.highlights,
      { title: "새 강점", description: "설명을 입력하세요." },
    ]
    updateAboutInfo("highlights", newList)
  }

  const removeHighlight = (index: number) => {
    updateAboutInfo(
      "highlights",
      aboutInfo.highlights.filter((_, i) => i !== index),
    )
  }

  const addTimelineItem = () => {
    const newList = [
      ...aboutInfo.timeline,
      {
        period: "연도 ~ 연도",
        title: "새 타임라인",
        description: "설명을 입력하세요.",
      },
    ]
    updateAboutInfo("timeline", newList)
  }

  const removeTimelineItem = (index: number) => {
    updateAboutInfo(
      "timeline",
      aboutInfo.timeline.filter((_, i) => i !== index),
    )
  }

  const addCourse = () => {
    const newList = [
      ...aboutInfo.courses,
      { name: "새 과목", detail: "과목 설명을 입력하세요." },
    ]
    updateAboutInfo("courses", newList)
  }

  const removeCourse = (index: number) => {
    updateAboutInfo(
      "courses",
      aboutInfo.courses.filter((_, i) => i !== index),
    )
  }

  const addInterest = () => {
    const newList = [...aboutInfo.interests, "#새로운관심분야"]
    updateAboutInfo("interests", newList)
  }

  const removeInterest = (index: number) => {
    updateAboutInfo(
      "interests",
      aboutInfo.interests.filter((_, i) => i !== index),
    )
  }

  const addStat = () => {
    const newList = [
      ...aboutInfo.stats,
      { label: "새 항목", value: "0", sub: "설명을 입력하세요." },
    ]
    updateAboutInfo("stats", newList)
  }

  const removeStat = (index: number) => {
    updateAboutInfo(
      "stats",
      aboutInfo.stats.filter((_, i) => i !== index),
    )
  }

  const addService = () => {
    const newList = [
      ...aboutInfo.services,
      { title: "새 역할", description: "설명을 입력하세요." },
    ]
    updateAboutInfo("services", newList)
  }

  const removeService = (index: number) => {
    updateAboutInfo(
      "services",
      aboutInfo.services.filter((_, i) => i !== index),
    )
  }

  const addTech = () => {
    const newList = [
      ...aboutInfo.techStack,
      { category: "새 카테고리", items: "내용을 입력하세요." },
    ]
    updateAboutInfo("techStack", newList)
  }

  const removeTech = (index: number) => {
    updateAboutInfo(
      "techStack",
      aboutInfo.techStack.filter((_, i) => i !== index),
    )
  }

  const addTestimonial = () => {
    const newList = [
      ...aboutInfo.testimonials,
      {
        name: "이름",
        role: "관계",
        quote: "피드백 내용을 입력하세요.",
      },
    ]
    updateAboutInfo("testimonials", newList)
  }

  const removeTestimonial = (index: number) => {
    updateAboutInfo(
      "testimonials",
      aboutInfo.testimonials.filter((_, i) => i !== index),
    )
  }

  const addLifePhoto = () => {
    const newList = [
      ...aboutInfo.lifePhotos,
      { image: "", caption: "사진 설명을 입력하세요." },
    ]
    updateAboutInfo("lifePhotos", newList)
  }

  const removeLifePhoto = (index: number) => {
    updateAboutInfo(
      "lifePhotos",
      aboutInfo.lifePhotos.filter((_, i) => i !== index),
    )
  }

  const getLevelChip = (level: "상" | "중" | "하") => {
    if (level === "상")
      return (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          상
        </span>
      )
    if (level === "중")
      return (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
          중
        </span>
      )
    return (
      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-200">
        하
      </span>
    )
  }

  const getHighlightIcon = (index: number) => {
    if (index === 0) return <Star className="w-5 h-5 text-primary" />
    if (index === 1) return <Users className="w-5 h-5 text-primary" />
    return <Activity className="w-5 h-5 text-primary" />
  }

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("about-background", newData)
        const updated = { ...aboutInfo, background: newData }
        setAboutInfo(updated)
        saveData("about-info", updated)
      }}
      storageKey="about-background"
      className="py-20 bg-muted/30 relative"
    >
      <section id="about" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* 상단 Hero 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-stretch">
            {/* 프로필 + 요약 */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 via-background to-background">
              <CardContent className="p-8 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-40 md:h-40 rounded-2xl overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                  <EditableMedia
                    src={aboutInfo.profileImage}
                    onChange={(src) => updateAboutInfo("profileImage", src)}
                    type="image"
                    storageKey="about-profile-image"
                    className="w-full h-full object-cover"
                    alt="프로필 이미지"
                    purpose="about-profile"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      <EditableText
                        value={aboutInfo.profileName}
                        onChange={(value) =>
                          updateAboutInfo("profileName", value)
                        }
                        storageKey="about-profile-name"
                      />
                    </h1>
                    <p className="text-primary mt-1 font-medium">
                      <EditableText
                        value={aboutInfo.profileTitle}
                        onChange={(value) =>
                          updateAboutInfo("profileTitle", value)
                        }
                        storageKey="about-profile-title"
                        multiline
                      />
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <EditableText
                      value={aboutInfo.profileSummary}
                      onChange={(value) =>
                        updateAboutInfo("profileSummary", value)
                      }
                      storageKey="about-profile-summary"
                      multiline
                    />
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ABOUT 텍스트 + CONTACT */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  <EditableText
                    value={aboutInfo.title}
                    onChange={(value) => updateAboutInfo("title", value)}
                    storageKey="about-title"
                  />
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <EditableText
                    value={aboutInfo.subtitle}
                    onChange={(value) => updateAboutInfo("subtitle", value)}
                    storageKey="about-subtitle"
                    multiline
                  />
                </p>
              </div>

              <Card className="border-0 shadow-md">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                      <EditableText
                        value={aboutInfo.labels.contactTitle}
                        onChange={(value) =>
                          updateLabels({ contactTitle: value })
                        }
                        storageKey="label-contact-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addPersonalField}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        항목 추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    {aboutInfo.resume.personal.map((item, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-2 items-center"
                      >
                        <span className="text-xs text-muted-foreground">
                          <EditableText
                            value={item.label}
                            onChange={(value) =>
                              updateResume("personal", idx, "label", value)
                            }
                            storageKey={`resume-personal-${idx}-label`}
                          />
                        </span>
                        <span className="font-medium break-words">
                          <EditableText
                            value={item.value}
                            onChange={(value) =>
                              updateResume("personal", idx, "value", value)
                            }
                            storageKey={`resume-personal-${idx}-value`}
                          />
                        </span>
                        {isEditMode && (
                          <button
                            onClick={() => removePersonalField(idx)}
                            className="text-[10px] text-muted-foreground hover:text-destructive"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 상단 Stats 배너 */}
          {aboutInfo.stats.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  <EditableText
                    value={aboutInfo.labels.statsSectionTitle}
                    onChange={(value) =>
                      updateLabels({ statsSectionTitle: value })
                    }
                    storageKey="label-stats-section-title"
                  />
                </span>
                {isEditMode && (
                  <button
                    onClick={addStat}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    항목 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.stats.map((s, idx) => (
                  <Card
                    key={idx}
                    className="border-0 shadow-md bg-card/80 hover:bg-card transition-colors relative"
                  >
                    <CardContent className="p-4 space-y-1">
                      {isEditMode && (
                        <button
                          onClick={() => removeStat(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <EditableText
                          value={s.label}
                          onChange={(value) => {
                            const newStats = [...aboutInfo.stats]
                            newStats[idx].label = value
                            updateAboutInfo("stats", newStats)
                          }}
                          storageKey={`stat-${idx}-label`}
                        />
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        <EditableText
                          value={s.value}
                          onChange={(value) => {
                            const newStats = [...aboutInfo.stats]
                            newStats[idx].value = value
                            updateAboutInfo("stats", newStats)
                          }}
                          storageKey={`stat-${idx}-value`}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <EditableText
                          value={s.sub}
                          onChange={(value) => {
                            const newStats = [...aboutInfo.stats]
                            newStats[idx].sub = value
                            updateAboutInfo("stats", newStats)
                          }}
                          storageKey={`stat-${idx}-sub`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* What I Do + Tech & Tools + Key Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8">
            {/* What I Do */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.whatIDoTitle}
                    onChange={(value) => updateLabels({ whatIDoTitle: value })}
                    storageKey="label-what-i-do-title"
                  />
                </h2>
                <span className="text-xs text-muted-foreground">
                  <EditableText
                    value={aboutInfo.whatIDoNote}
                    onChange={(value) => updateAboutInfo("whatIDoNote", value)}
                    storageKey="what-i-do-note"
                  />
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                {isEditMode && (
                  <button
                    onClick={addService}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5 mb-1"
                  >
                    <Plus className="w-3 h-3" />
                    카드 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {aboutInfo.services.map((srv, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <CardContent className="p-4 space-y-2">
                      {isEditMode && (
                        <button
                          onClick={() => removeService(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-sm font-semibold">
                        <EditableText
                          value={srv.title}
                          onChange={(value) => {
                            const newServices = [...aboutInfo.services]
                            newServices[idx].title = value
                            updateAboutInfo("services", newServices)
                          }}
                          storageKey={`service-${idx}-title`}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <EditableText
                          value={srv.description}
                          onChange={(value) => {
                            const newServices = [...aboutInfo.services]
                            newServices[idx].description = value
                            updateAboutInfo("services", newServices)
                          }}
                          storageKey={`service-${idx}-desc`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tech & Tools + Key Skills */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wide flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.techToolsTitle}
                        onChange={(value) =>
                          updateLabels({ techToolsTitle: value })
                        }
                        storageKey="label-tech-tools-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addTech}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        항목 추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {aboutInfo.techStack.map((t, idx) => (
                      <div key={idx} className="space-y-1 relative">
                        {isEditMode && (
                          <button
                            onClick={() => removeTech(idx)}
                            className={COMMON_STYLES.deleteButton}
                          >
                            <X className={COMMON_STYLES.deleteIcon} />
                          </button>
                        )}
                        <p className="text-xs font-semibold text-foreground">
                          <EditableText
                            value={t.category}
                            onChange={(value) => {
                              const newTech = [...aboutInfo.techStack]
                              newTech[idx].category = value
                              updateAboutInfo("techStack", newTech)
                            }}
                            storageKey={`tech-${idx}-cat`}
                          />
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <EditableText
                            value={t.items}
                            onChange={(value) => {
                              const newTech = [...aboutInfo.techStack]
                              newTech[idx].items = value
                              updateAboutInfo("techStack", newTech)
                            }}
                            storageKey={`tech-${idx}-items`}
                            multiline
                          />
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                    <EditableText
                      value={aboutInfo.labels.keySkillsTitle}
                      onChange={(value) =>
                        updateLabels({ keySkillsTitle: value })
                      }
                      storageKey="label-key-skills-title"
                    />
                  </h3>
                  <div className="space-y-3">
                    {aboutInfo.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          {skill.level === "상" && (
                            <Star className="w-4 h-4 text-primary" />
                          )}
                          {skill.level === "중" && (
                            <Target className="w-4 h-4 text-primary" />
                          )}
                          {skill.level === "하" && (
                            <Zap className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              <EditableText
                                value={skill.title}
                                onChange={(value) => {
                                  const newSkills = [...aboutInfo.skills]
                                  newSkills[idx].title = value
                                  updateAboutInfo("skills", newSkills)
                                }}
                                storageKey={`skills-${idx}-title`}
                              />
                            </span>
                            {getLevelChip(skill.level)}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <EditableText
                              value={skill.description}
                              onChange={(value) => {
                                const newSkills = [...aboutInfo.skills]
                                newSkills[idx].description = value
                                updateAboutInfo("skills", newSkills)
                              }}
                              storageKey={`skills-${idx}-desc`}
                              multiline
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ⭐ 강점 하이라이트 */}
          {aboutInfo.highlights.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.highlightsTitle}
                    onChange={(value) =>
                      updateLabels({ highlightsTitle: value })
                    }
                    storageKey="label-highlights-title"
                  />
                </h2>
                <div className="flex items-center gap-2">
                  {isEditMode && (
                    <button
                      onClick={addHighlight}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                    >
                      <Plus className="w-3 h-3" />
                      카드 추가
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.highlights.map((h, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <CardContent className="p-4 space-y-2">
                      {isEditMode && (
                        <button
                          onClick={() => removeHighlight(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <div className="flex items-center gap-2">
                        {getHighlightIcon(idx)}
                        <h3 className="text-sm font-semibold">
                          <EditableText
                            value={h.title}
                            onChange={(value) => {
                              const newH = [...aboutInfo.highlights]
                              newH[idx].title = value
                              updateAboutInfo("highlights", newH)
                            }}
                            storageKey={`highlight-${idx}-title`}
                          />
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <EditableText
                          value={h.description}
                          onChange={(value) => {
                            const newH = [...aboutInfo.highlights]
                            newH[idx].description = value
                            updateAboutInfo("highlights", newH)
                          }}
                          storageKey={`highlight-${idx}-desc`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 이력서 섹션 */}
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-bold">
                <EditableText
                  value={aboutInfo.labels.resumeTitle}
                  onChange={(value) => updateLabels({ resumeTitle: value })}
                  storageKey="label-resume-title"
                />
              </h2>
              <span className="text-xs text-muted-foreground">
                <EditableText
                  value={aboutInfo.resumeCaption}
                  onChange={(value) =>
                    updateAboutInfo("resumeCaption", value)
                  }
                  storageKey="resume-caption"
                  multiline
                />
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* 학력 + 경험 */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.educationTitle}
                        onChange={(value) =>
                          updateLabels({ educationTitle: value })
                        }
                        storageKey="label-education-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addEducation}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {aboutInfo.resume.education.map((edu, idx) => (
                      <Card
                        key={idx}
                        className="border bg-card/60 relative"
                      >
                        <CardContent className="p-4 space-y-1">
                          {isEditMode && (
                            <button
                              onClick={() => removeEducation(idx)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={edu.period}
                              onChange={(value) =>
                                updateResume(
                                  "education",
                                  idx,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-edu-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={edu.title}
                              onChange={(value) =>
                                updateResume(
                                  "education",
                                  idx,
                                  "title",
                                  value,
                                )
                              }
                              storageKey={`resume-edu-${idx}-title`}
                            />
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <EditableText
                              value={edu.subtitle || ""}
                              onChange={(value) =>
                                updateResume(
                                  "education",
                                  idx,
                                  "subtitle",
                                  value,
                                )
                              }
                              storageKey={`resume-edu-${idx}-subtitle`}
                              multiline
                            />
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold mb-0 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.experienceTitle}
                        onChange={(value) =>
                          updateLabels({ experienceTitle: value })
                        }
                        storageKey="label-experience-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addExperience}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {aboutInfo.resume.experience.map((exp, idx) => (
                      <Card
                        key={idx}
                        className="border bg-card/60 relative"
                      >
                        <CardContent className="p-4 space-y-1">
                          {isEditMode && (
                            <button
                              onClick={() => removeExperience(idx)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={exp.period}
                              onChange={(value) =>
                                updateResume(
                                  "experience",
                                  idx,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-exp-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={exp.title}
                              onChange={(value) =>
                                updateResume(
                                  "experience",
                                  idx,
                                  "title",
                                  value,
                                )
                              }
                              storageKey={`resume-exp-${idx}-title`}
                            />
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <EditableText
                              value={exp.description || ""}
                              onChange={(value) =>
                                updateResume(
                                  "experience",
                                  idx,
                                  "description",
                                  value,
                                )
                              }
                              storageKey={`resume-exp-${idx}-desc`}
                              multiline
                            />
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* 활동 + 자격 */}
              <div className="space-y-6">
                <div>
                  <div className="flex itemsCats-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.activityTitle}
                        onChange={(value) =>
                          updateLabels({ activityTitle: value })
                        }
                        storageKey="label-activity-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addActivity}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        활동 추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {aboutInfo.resume.activities.map((act, idx) => (
                      <Card
                        key={idx}
                        className="border bg-card/60 relative"
                      >
                        <CardContent className="p-4 space-y-1">
                          {isEditMode && (
                            <button
                              onClick={() => removeActivity(idx)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={act.period}
                              onChange={(value) =>
                                updateResume(
                                  "activities",
                                  idx,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-act-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={act.title}
                              onChange={(value) =>
                                updateResume(
                                  "activities",
                                  idx,
                                  "title",
                                  value,
                                )
                              }
                              storageKey={`resume-act-${idx}-title`}
                            />
                          </p>
                          <ul className="mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                            {act.details.map((d, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-1"
                              >
                                <div className="flex-1">
                                  <EditableText
                                    value={d}
                                    onChange={(value) =>
                                      updateResume(
                                        "activities",
                                        idx,
                                        "details",
                                        value,
                                        dIdx,
                                      )
                                    }
                                    storageKey={`resume-act-${idx}-detail-${dIdx}`}
                                    multiline
                                  />
                                </div>
                                {isEditMode && (
                                  <button
                                    onClick={() =>
                                      removeActivityDetail(idx, dIdx)
                                    }
                                    className="text-[10px] text-muted-foreground hover:text-destructive ml-1"
                                  >
                                    삭제
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                          {isEditMode && (
                            <button
                              onClick={() => addActivityDetail(idx)}
                              className="mt-2 inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/40 text-primary hover:bg-primary/5"
                            >
                              <Plus className="w-3 h-3" />
                              내용 추가
                            </button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.certificateTitle}
                        onChange={(value) =>
                          updateLabels({ certificateTitle: value })
                        }
                        storageKey="label-certificate-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addCertificate}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 text-xs">
                    {aboutInfo.resume.certificates.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 relative"
                      >
                        {isEditMode && (
                          <button
                            onClick={() => removeCertificate(idx)}
                            className={COMMON_STYLES.deleteButton}
                          >
                            <X className={COMMON_STYLES.deleteIcon} />
                          </button>
                        )}
                        <span className="w-24 text-primary">
                          <EditableText
                            value={cert.date}
                            onChange={(value) =>
                              updateResume(
                                "certificates",
                                idx,
                                "date",
                                value,
                              )
                            }
                            storageKey={`resume-cert-${idx}-date`}
                          />
                        </span>
                        <span className="flex-1">
                          <EditableText
                            value={cert.name}
                            onChange={(value) =>
                              updateResume(
                                "certificates",
                                idx,
                                "name",
                                value,
                              )
                            }
                            storageKey={`resume-cert-${idx}-name`}
                            multiline
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 관심 분야 + 모토/글귀 */}
          {aboutInfo.interests.length > 0 && (
            <div className="space-y-3">
              {/* 관심 분야 태그 */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.interestsTitle}
                      onChange={(value) =>
                        updateLabels({ interestsTitle: value })
                      }
                      storageKey="label-interests-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addInterest}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    태그 추가
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutInfo.interests.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary inline-flex items-center gap-1"
                  >
                    <EditableText
                      value={i}
                      onChange={(value) => {
                        const newInterests = [...aboutInfo.interests]
                        newInterests[idx] = value
                        updateAboutInfo("interests", newInterests)
                      }}
                      storageKey={`interest-${idx}`}
                    />
                    {isEditMode && (
                      <button
                        onClick={() => removeInterest(idx)}
                        className="text-[10px] text-primary/70 hover:text-destructive ml-1"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {/* (아이콘) 모토 / 글귀  + 회색 한 줄 캡션 */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2">
                  {/* 🔥 여기만 불 아이콘으로 변경 */}
                  <Flame className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    <EditableText
                      value={aboutInfo.labels.interestMottoTitle}
                      onChange={(value) =>
                        updateLabels({ interestMottoTitle: value })
                      }
                      storageKey="label-interest-motto-title"
                    />
                  </p>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  <EditableText
                    value={aboutInfo.interestMotto}
                    onChange={(value) =>
                      updateAboutInfo("interestMotto", value)
                    }
                    storageKey="interest-motto"
                    multiline
                  />
                </p>
              </div>
            </div>
          )}

          {/* 📌 타임라인 */}
          {aboutInfo.timeline.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.timelineTitle}
                      onChange={(value) =>
                        updateLabels({ timelineTitle: value })
                      }
                      storageKey="label-timeline-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addTimelineItem}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    항목 추가
                  </button>
                )}
              </div>
              <div className="relative pl-4 border-l border-border/60 space-y-4">
                {aboutInfo.timeline.map((t, idx) => (
                  <div key={idx} className="relative pl-4">
                    {isEditMode && (
                      <button
                        onClick={() => removeTimelineItem(idx)}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-xs text-primary font-medium">
                      <EditableText
                        value={t.period}
                        onChange={(value) => {
                          const newT = [...aboutInfo.timeline]
                          newT[idx].period = value
                          updateAboutInfo("timeline", newT)
                        }}
                        storageKey={`timeline-${idx}-period`}
                      />
                    </p>
                    <p className="text-sm font-semibold">
                      <EditableText
                        value={t.title}
                        onChange={(value) => {
                          const newT = [...aboutInfo.timeline]
                          newT[idx].title = value
                          updateAboutInfo("timeline", newT)
                        }}
                        storageKey={`timeline-${idx}-title`}
                      />
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <EditableText
                        value={t.description}
                        onChange={(value) => {
                          const newT = [...aboutInfo.timeline]
                          newT[idx].description = value
                          updateAboutInfo("timeline", newT)
                        }}
                        storageKey={`timeline-${idx}-desc`}
                        multiline
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 📚 수강 과목 & 학습 주제 */}
          {aboutInfo.courses.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.coursesTitle}
                      onChange={(value) =>
                        updateLabels({ coursesTitle: value })
                      }
                      storageKey="label-courses-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addCourse}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    과목 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aboutInfo.courses.map((c, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/60 relative overflow-visible"
                  >
                    <CardContent className="p-4 space-y-1">
                      {isEditMode && (
                        <button
                          onClick={() => removeCourse(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-sm font-semibold">
                        <EditableText
                          value={c.name}
                          onChange={(value) => {
                            const newC = [...aboutInfo.courses]
                            newC[idx].name = value
                            updateAboutInfo("courses", newC)
                          }}
                          storageKey={`course-${idx}-name`}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <EditableText
                          value={c.detail}
                          onChange={(value) => {
                            const newC = [...aboutInfo.courses]
                            newC[idx].detail = value
                            updateAboutInfo("courses", newC)
                          }}
                          storageKey={`course-${idx}-detail`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 함께한 사람들이 본 나 (Testimonials) */}
          {aboutInfo.testimonials.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.testimonialTitle}
                    onChange={(value) =>
                      updateLabels({ testimonialTitle: value })
                    }
                    storageKey="label-testimonial-title"
                  />
                </h2>
                {isEditMode && (
                  <button
                    onClick={addTestimonial}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    카드 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.testimonials.map((t, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <CardContent className="p-4 space-y-2">
                      {isEditMode && (
                        <button
                          onClick={() => removeTestimonial(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        <EditableText
                          value={t.quote}
                          onChange={(value) => {
                            const newT = [...aboutInfo.testimonials]
                            newT[idx].quote = value
                            updateAboutInfo("testimonials", newT)
                          }}
                          storageKey={`testimonial-${idx}-quote`}
                          multiline
                        />
                      </p>
                      <p className="text-xs font-semibold">
                        <EditableText
                          value={t.name}
                          onChange={(value) => {
                            const newT = [...aboutInfo.testimonials]
                            newT[idx].name = value
                            updateAboutInfo("testimonials", newT)
                          }}
                          storageKey={`testimonial-${idx}-name`}
                        />
                        <span className="text-[11px] text-muted-foreground ml-1">
                          <EditableText
                            value={t.role}
                            onChange={(value) => {
                              const newT = [...aboutInfo.testimonials]
                              newT[idx].role = value
                              updateAboutInfo("testimonials", newT)
                            }}
                            storageKey={`testimonial-${idx}-role`}
                          />
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Life & Moments 사진 갤러리 */}
          {aboutInfo.lifePhotos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.lifeMomentsTitle}
                      onChange={(value) =>
                        updateLabels({ lifeMomentsTitle: value })
                      }
                      storageKey="label-life-moments-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addLifePhoto}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    사진 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.lifePhotos.map((p, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 overflow-hidden relative"
                  >
                    <div className="w-full h-40 bg-muted">
                      <EditableMedia
                        src={p.image}
                        onChange={(src) => {
                          const newPhotos = [...aboutInfo.lifePhotos]
                          newPhotos[idx].image = src
                          updateAboutInfo("lifePhotos", newPhotos)
                        }}
                        type="image"
                        storageKey={`life-photo-${idx}`}
                        className="w-full h-full object-cover"
                        alt={p.caption}
                        purpose="life-photo"
                      />
                    </div>
                    <CardContent className="p-3">
                      {isEditMode && (
                        <button
                          onClick={() => removeLifePhoto(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground text-center">
                        <EditableText
                          value={p.caption}
                          onChange={(value) => {
                            const newPhotos = [...aboutInfo.lifePhotos]
                            newPhotos[idx].caption = value
                            updateAboutInfo("lifePhotos", newPhotos)
                          }}
                          storageKey={`life-photo-${idx}-caption`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Projects 섹션 */}
          <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.projectsTitle}
                    onChange={(value) =>
                      updateLabels({ projectsTitle: value })
                    }
                    storageKey="label-projects-title"
                  />
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  <EditableText
                    value={aboutInfo.projectsCaption}
                    onChange={(value) =>
                      updateAboutInfo("projectsCaption", value)
                    }
                    storageKey="projects-caption"
                    multiline
                  />
                </p>
              </div>
              {isEditMode && (
                <button
                  onClick={addProject}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                >
                  <Plus className="w-3 h-3" />
                  프로젝트 추가
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutInfo.projects.map((project, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg relative overflow-hidden flex flex-col"
                >
                  <CardContent className="p-5 flex flex-col gap-4">
                    {isEditMode && (
                      <button
                        onClick={() => removeProject(index)}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}

                    {/* 표지 이미지 업로드 */}
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-muted">
                      <EditableMedia
                        src={project.coverImage}
                        onChange={(src) =>
                          updateProject(index, "coverImage", src)
                        }
                        type="image"
                        storageKey={`project-${index}-cover`}
                        className="w-full h-full object-cover"
                        alt={`${project.title} 표지 이미지`}
                        purpose="project-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-primary font-medium">
                        <EditableText
                          value={project.period}
                          onChange={(value) =>
                            updateProject(index, "period", value)
                          }
                          storageKey={`project-${index}-period`}
                        />
                      </p>
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <EditableText
                          value={project.title}
                          onChange={(value) =>
                            updateProject(index, "title", value)
                          }
                          storageKey={`project-${index}-title`}
                        />
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <EditableText
                          value={project.description}
                          onChange={(value) =>
                            updateProject(index, "description", value)
                          }
                          storageKey={`project-${index}-desc`}
                          multiline
                        />
                      </p>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-[11px] bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {isEditMode && (
                      <div className="text-[11px] text-muted-foreground space-y-1">
                        <span>
                          <EditableText
                            value={aboutInfo.labels.projectTagsLabel}
                            onChange={(value) =>
                              updateLabels({ projectTagsLabel: value })
                            }
                            storageKey="label-project-tags"
                          />
                        </span>
                        <EditableText
                          value={project.tags.join(" ")}
                          onChange={(value) => updateProjectTags(index, value)}
                          storageKey={`project-${index}-tags`}
                        />
                      </div>
                    )}

                    {/* PDF 링크 (외부 링크 포함) */}
                    <div className="pt-2 border-t border-border/60 mt-2 flex flex-col gap-2">
                      {project.pdfUrl && (
                        <a
                          href={project.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          {project.pdfName || "PDF 열기"}
                        </a>
                      )}

                      {isEditMode && (
                        <div className="text-[11px] text-muted-foreground space-y-1">
                          <p className="font-medium">PDF / 링크 정보</p>
                          <div className="space-y-1">
                            <div className="flex flex-col gap-1">
                              <span>표시할 파일 이름 (예: 고덕동 분석 리포트)</span>
                              <EditableText
                                value={project.pdfName}
                                onChange={(value) =>
                                  updateProject(index, "pdfName", value)
                                }
                                storageKey={`project-${index}-pdfName`}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span>PDF 또는 외부 링크 URL</span>
                              <EditableText
                                value={project.pdfUrl}
                                onChange={(value) =>
                                  updateProject(index, "pdfUrl", value)
                                }
                                storageKey={`project-${index}-pdfUrl`}
                                multiline
                              />
                            </div>
                          </div>
                          <p className="text-[10px] mt-1">
                            <EditableText
                              value={aboutInfo.labels.projectPdfNote}
                              onChange={(value) =>
                                updateLabels({ projectPdfNote: value })
                              }
                              storageKey="label-project-pdf-note"
                              multiline
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>
    </EditableBackground>
  )
}
