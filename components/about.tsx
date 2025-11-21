"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Link as LinkIcon,
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

type LinkItem = {
  label: string
  url: string
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
  timeline: TimelineItem[]
  courses: CourseItem[]
  links: LinkItem[]
  stats: Stat[]
  services: ServiceItem[]
  techStack: TechCategory[]
  testimonials: Testimonial[]
  lifePhotos: LifePhoto[]
}

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  const defaultInfo = {
    title: "김민수 포트폴리오",
    subtitle: "당신의 전문성과 열정을 소개해주세요.",
    background: {"image":"","video":"","color":"","opacity":0.08},
    profileName: "김민수",
    profileTitle: "단국대학교 도시계획부동산학부",
    profileSummary: "도시재생과 주택시장 분석에 관심이 많으며, 데이터와 현장을 함께 보려고 노력합니다. 팀 프로젝트와 동아리 활동을 통해 사람들과 협업하는 법을 배웠습니다.",
    profileImage: "",
    contact: [{"label":"Email","value":"example@naver.com"},{"label":"Phone","value":"010-0000-0000"},{"label":"Address","value":"경기 용인시 수지구 죽전동"},{"label":"GitHub / Blog","value":"https://github.com/your-id"}],
    stats: [{"label":"전공 프로젝트","value":"6+","sub":"수업·팀 과제 포함"},{"label":"교육 봉사","value":"2+년","sub":"아이사랑 동아리 활동"},{"label":"관심 분야 리포트","value":"10+","sub":"주택·도시재생·환경 등"}],
    services: [{"title":"도시·부동산 리서치","description":"정책 자료, 통계, 논문과 현장 자료를 종합해 이슈의 흐름을 정리하고 인사이트를 도출합니다."},{"title":"기초 데이터 분석 & 시각화","description":"실거래가, 인구구조, 상권 데이터 등을 엑셀과 통계를 활용해 정리·해석합니다."},{"title":"기획·발표 및 협업","description":"팀 프로젝트에서 역할 분담, 일정 관리, 발표 자료 제작을 맡으며 구성원들과 조율합니다."}],
    skills: [{"title":"도시·부동산 리서치","level":"상","description":"정책 자료, 통계, 논문 등을 조사하여 흐름을 정리하고 핵심 인사이트를 도출합니다."},{"title":"데이터 분석(입문)","level":"중","description":"엑셀과 기본 통계를 활용하여 실거래가, 인구구조 등 데이터를 정리·시각화합니다."},{"title":"협업 & 커뮤니케이션","level":"상","description":"동아리 임원 경험을 바탕으로 일정 조율, 회의 진행, 역할 분담에 익숙합니다."}],
    techStack: [{"category":"데이터 & 분석","items":"Excel · 통계 기초 · 실거래가 데이터 · 인구통계"},{"category":"도구 & 소프트웨어","items":"PowerPoint · Word · QGIS / ArcGIS(입문)"},{"category":"관심 기술","items":"Python(기초 학습 중) · 데이터 시각화 · 공간 데이터"}],
    resume: {"personal":[{"label":"이름","value":"김민수"},{"label":"생년월일","value":"2000.00.00"},{"label":"주소","value":"경기 용인시 수지구 죽전동"},{"label":"Email","value":"example@naver.com"}],"education":[{"period":"2018.03 ~ 2021.02","title":"OO고등학교","subtitle":"인문계열"},{"period":"2021.03 ~ 2027.02(졸업 예정)","title":"단국대학교 죽전캠퍼스","subtitle":"도시계획부동산학부"}],"experience":[{"period":"2023.03 ~ 현재","title":"아이사랑 동아리 교육부장","description":"아동 교육 봉사 기획 및 운영, 신규 부원 온보딩, 교육 프로그램 커리큘럼 구성"},{"period":"2024.03 ~ 2024.06","title":"도시·부동산 관련 팀 프로젝트","description":"주택시장·도시재생 이슈를 주제로 리포트 작성 및 발표"}],"activities":[{"period":"2023.03 ~ 현재","title":"아이사랑 동아리","details":["초등학생 대상 학습 지도 및 놀이 프로그램 진행","부원 간 소통과 활동 일정 조율, 행사 기획 참여"]},{"period":"2024.09 ~ 2024.12","title":"전공 수업 프로젝트","details":["서울시 특정 지역의 인구·상권 데이터 분석","GIS를 활용한 시각화 및 발표 자료 제작"]}],"certificates":[{"date":"2024.00.00","name":"관심 있는 자격증 또는 준비 중인 시험을 입력하세요."}]},
    projects: [{"title":"서울 고덕동 아파트 실거래가 분석","period":"2023.09 ~ 2023.12","description":"국토부 실거래가 데이터를 활용하여 고덕동 주요 단지의 가격 추세와 9호선 연장, 비즈밸리 조성 등 개발 호재의 영향을 분석한 리포트입니다.","tags":["#실거래가ㅇ","#아파트분석","#고덕동"],"coverImage":"","pdfName":"토지론입문 Report1.pdf"},{"title":"한·일 고령사회 주거정책 비교","period":"2024.03 ~ 2024.06","description":"한국과 일본의 고령자 주거지원, 빈집 문제, 농촌 활성화 정책을 비교하여 시사점을 정리한 팀 발표 과제입니다.","tags":["#고령사회","#주거정책","#비교연구"],"coverImage":"","pdfName":""}],
    highlights: [{"title":"현장을 보는 시각","description":"데이터뿐 아니라 실제 공간과 사람들의 생활을 함께 보면서 해석하려고 합니다."},{"title":"꾸준함과 책임감","description":"동아리와 팀 프로젝트에서 맡은 역할을 끝까지 책임지고 수행해 왔습니다."},{"title":"배우는 속도","description":"처음 보는 도구나 개념도 차근차근 익히며, 모르는 것은 질문하고 찾아보는 편입니다."}],
    interests: ["#도시재생","#주택시장","#고령사회","#보행친화도시","#상권분석","#생활SOC"],
    timeline: [{"period":"2018 ~ 2021","title":"고등학교 시절","description":"지리/사회 과목을 좋아하며, 도시와 공간에 대한 관심을 쌓기 시작."},{"period":"2021 ~ 현재","title":"단국대학교 도시계획부동산학부","description":"도시계획·부동산 전공 지식과 함께, 팀 프로젝트·발표 경험을 쌓는 중."},{"period":"2023 ~ 현재","title":"아이사랑 동아리","description":"교육봉사를 통해 사람들과 소통하고 협업하는 경험을 지속적으로 확장."}],
    courses: [{"name":"GIS와 도시공간분석","detail":"공간 데이터를 활용한 분석 및 시각화 기초 학습."},{"name":"토지론입문","detail":"토지의 경제적 특성과 제도, 이용 방식에 대한 이해."},{"name":"부동산시장분석","detail":"주택시장, 상업용 부동산 시장의 구조와 가격 형성 요인 학습."},{"name":"도시재생론","detail":"쇠퇴 지역의 재생 전략과 국내외 사례 분석."}],
    links: [{"label":"GitHub","url":"https://github.com/your-id"},{"label":"블로그 / Velog","url":"https://velog.io/@your-id"},{"label":"포트폴리오 PDF","url":""}],
    testimonials: [{"name":"동아리 부원","role":"아이사랑","quote":"항상 먼저 다가와 주고, 약속한 일은 끝까지 책임지는 스타일이에요."},{"name":"팀 프로젝트 팀원","role":"전공 수업","quote":"정리와 발표를 잘해서 팀 분위기를 안정적으로 잡아주는 역할을 많이 했습니다."},{"name":"지도교수 가정","role":"수업 피드백","quote":"도시 문제를 보는 시각이 꾸준히 성장하고 있다는 평가를 받았습니다."}],
    lifePhotos: [{"image":"","caption":"동아리 교육 봉사 활동"},{"image":"","caption":"현장 답사 및 도시 관찰"},{"image":"","caption":"친구들과의 협업·스터디"}]
  }

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  // ✅ PDF는 localStorage에 저장하지 않고, 이 state에만 저장
  const [projectPdfs, setProjectPdfs] = useState<{
    [key: number]: { pdfName: string; file: File }
  }>({})

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
        links: saved.links || defaultInfo.links,
        stats: saved.stats || defaultInfo.stats,
        services: saved.services || defaultInfo.services,
        techStack: saved.techStack || defaultInfo.techStack,
        testimonials: saved.testimonials || defaultInfo.testimonials,
        lifePhotos: saved.lifePhotos || defaultInfo.lifePhotos,
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
      },
    ]
    updateAboutInfo("projects", newProjects)
  }

  const removeProject = (index: number) => {
    updateAboutInfo(
      "projects",
      aboutInfo.projects.filter((_, i) => i !== index),
    )
    setProjectPdfs((prev) => {
      const copy = { ...prev }
      delete copy[index]
      return copy
    })
  }

  const updateProjectTags = (index: number, tagsString: string) => {
    const tags = tagsString
      .split(" ")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    updateProject(index, "tags", tags)
  }

  // ✅ PDF 업로드 (File 객체만 state에 저장, localStorage에는 파일 이름만 저장)
  const handleProjectPdfUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드할 수 있습니다.")
      return
    }

    // 메모리(state)에만 저장
    setProjectPdfs((prev) => ({
      ...prev,
      [index]: { pdfName: file.name, file },
    }))

    // localStorage에는 파일 이름만 저장
    const newProjects = [...aboutInfo.projects]
    newProjects[index] = {
      ...newProjects[index],
      pdfName: file.name,
    }
    updateAboutInfo("projects", newProjects)
  }

  // ✅ 버튼 클릭 시 Blob URL로 새 탭에서 PDF 열기
  const handleOpenPdf = (index: number) => {
    const entry = projectPdfs[index]
    if (!entry) {
      alert("이 브라우저 세션에서 업로드한 PDF만 열 수 있습니다. 다시 업로드해 주세요.")
      return
    }

    const url = URL.createObjectURL(entry.file)
    window.open(url, "_blank", "noopener,noreferrer")
    // 너무 오래 안 쓰면 메모리 회수용으로 나중에 revoke 가능
    // setTimeout(() => URL.revokeObjectURL(url), 60_000)
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
                  <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                    CONTACT
                  </h3>
                  <div className="space-y-2 text-sm">
                    {aboutInfo.resume.personal.map((item, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[80px_minmax(0,1fr)] gap-2 items-center"
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 상단 Stats 배너 */}
          {aboutInfo.stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aboutInfo.stats.map((s, idx) => (
                <Card
                  key={idx}
                  className="border-0 shadow-md bg-card/80 hover:bg-card transition-colors"
                >
                  <CardContent className="p-4 space-y-1">
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
          )}

          {/* What I Do + Tech & Tools + Key Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8">
            {/* What I Do */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  What I Do
                </h2>
                <span className="text-xs text-muted-foreground">
                  민수가 잘할 수 있는 일들
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {aboutInfo.services.map((srv, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 space-y-2">
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
                  <h3 className="text-sm font-semibold text-muted-foreground tracking-wide flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    TECH & TOOLS
                  </h3>
                  <div className="space-y-2">
                    {aboutInfo.techStack.map((t, idx) => (
                      <div key={idx} className="space-y-1">
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
                    KEY SKILLS
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
                  강점 한눈에 보기
                </h2>
                <span className="text-xs text-muted-foreground">
                  민수의 성향과 강점을 카드로 정리한 영역입니다.
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.highlights.map((h, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 space-y-2">
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
              <h2 className="text-2xl font-bold">이력서</h2>
              <span className="text-xs text-muted-foreground">
                주요 학력과 경험을 한 눈에 볼 수 있도록 정리했습니다.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* 학력 + 경험 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    학력
                  </h3>
                  <div className="space-y-3">
                    {aboutInfo.resume.education.map((edu, idx) => (
                      <Card key={idx} className="border bg-card/60">
                        <CardContent className="p-4 space-y-1">
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={edu.period}
                              onChange={(value) =>
                                updateResume("education", idx, "period", value)
                              }
                              storageKey={`resume-edu-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={edu.title}
                              onChange={(value) =>
                                updateResume("education", idx, "title", value)
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
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    전공 관련 경험
                  </h3>
                  <div className="space-y-3">
                    {aboutInfo.resume.experience.map((exp, idx) => (
                      <Card key={idx} className="border bg-card/60">
                        <CardContent className="p-4 space-y-1">
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={exp.period}
                              onChange={(value) =>
                                updateResume("experience", idx, "period", value)
                              }
                              storageKey={`resume-exp-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={exp.title}
                              onChange={(value) =>
                                updateResume("experience", idx, "title", value)
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
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    활동 & 대외 경험
                  </h3>
                  <div className="space-y-3">
                    {aboutInfo.resume.activities.map((act, idx) => (
                      <Card key={idx} className="border bg-card/60">
                        <CardContent className="p-4 space-y-1">
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={act.period}
                              onChange={(value) =>
                                updateResume("activities", idx, "period", value)
                              }
                              storageKey={`resume-act-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={act.title}
                              onChange={(value) =>
                                updateResume("activities", idx, "title", value)
                              }
                              storageKey={`resume-act-${idx}-title`}
                            />
                          </p>
                          <ul className="mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                            {act.details.map((d, dIdx) => (
                              <li key={dIdx}>
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
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    자격 및 기타
                  </h3>
                  <div className="space-y-2 text-xs">
                    {aboutInfo.resume.certificates.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-24 text-primary">
                          <EditableText
                            value={cert.date}
                            onChange={(value) =>
                              updateResume("certificates", idx, "date", value)
                            }
                            storageKey={`resume-cert-${idx}-date`}
                          />
                        </span>
                        <span className="flex-1">
                          <EditableText
                            value={cert.name}
                            onChange={(value) =>
                              updateResume("certificates", idx, "name", value)
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

          {/* 🎯 관심 분야 */}
          {aboutInfo.interests.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">관심 분야</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutInfo.interests.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
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
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 📌 타임라인 */}
          {aboutInfo.timeline.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">타임라인</h2>
              </div>
              <div className="relative pl-4 border-l border-border/60 space-y-4">
                {aboutInfo.timeline.map((t, idx) => (
                  <div key={idx} className="relative pl-4">
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
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">수강 과목 & 학습 주제</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aboutInfo.courses.map((c, idx) => (
                  <Card key={idx} className="border bg-card/60">
                    <CardContent className="p-4 space-y-1">
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

          {/* 🔗 링크 모음 */}
          {aboutInfo.links.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">링크 모음</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {aboutInfo.links.map((l, idx) => (
                  <a
                    key={idx}
                    href={l.url || "#"}
                    target={l.url ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${
                      l.url
                        ? "border-primary/40 text-primary hover:bg-primary/5"
                        : "border-dashed border-muted-foreground/40 text-muted-foreground"
                    }`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    <EditableText
                      value={l.label}
                      onChange={(value) => {
                        const newLinks = [...aboutInfo.links]
                        newLinks[idx].label = value
                        updateAboutInfo("links", newLinks)
                      }}
                      storageKey={`link-${idx}-label`}
                    />
                  </a>
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
                  함께한 사람들이 본 나
                </h2>
                <span className="text-xs text-muted-foreground">
                  동아리·팀 프로젝트에서 받은 피드백을 정리했습니다.
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.testimonials.map((t, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 space-y-2">
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
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Life & Moments</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.lifePhotos.map((p, idx) => (
                  <Card key={idx} className="border bg-card/70 overflow-hidden">
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
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  Projects
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  수업·과제·개인 프로젝트 중 보여주고 싶은 작업을 정리한 영역입니다.
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
                        <span>태그 (공백으로 구분):</span>
                        <EditableText
                          value={project.tags.join(" ")}
                          onChange={(value) => updateProjectTags(index, value)}
                          storageKey={`project-${index}-tags`}
                        />
                      </div>
                    )}

                    {/* PDF 링크 */}
                    <div className="pt-2 border-t border-border/60 mt-2 flex flex-col gap-2">
                      {projectPdfs[index] && (
                        <button
                          type="button"
                          onClick={() => handleOpenPdf(index)}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          {projectPdfs[index].pdfName ||
                            project.pdfName ||
                            "PDF 보기"}
                        </button>
                      )}

                      {isEditMode && (
                        <div className="text-[11px] text-muted-foreground space-y-1">
                          <label className="font-medium">PDF 업로드</label>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleProjectPdfUpload(e, index)}
                            className="block w-full text-[11px]"
                          />
                          {project.pdfName && (
                            <p className="mt-1">현재 파일명: {project.pdfName}</p>
                          )}
                          <p className="text-[10px]">
                            * 업로드한 PDF는 이 페이지를 켜 놓은 동안에만 열 수 있습니다.
                            (브라우저 메모리에만 저장되고, localStorage나 서버에는 저장되지 않습니다.)
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </EditableBackground>
  )
}
