"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Plus,
  X,
  FolderOpen,
  FileText,
  Star,
  Target,
  Zap,
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"

type Project = {
  title: string
  period: string
  description: string
  tags: string[]
  coverImage: string
  pdfName: string
  pdfDataUrl: string
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

type AboutInfo = {
  title: string
  subtitle: string
  background: { image: string; video: string; color: string; opacity: number }
  profileName: string
  profileTitle: string
  profileSummary: string
  profileImage: string
  contact: { label: string; icon: "email" | "phone" | "location" | "link"; value: string }[]
  skills: { title: string; level: "상" | "중" | "하"; description: string }[]
  resume: Resume
  projects: Project[]
}

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  const defaultInfo: AboutInfo = {
    title: "김민수 포트폴리오",
    subtitle: "도시를 관찰하고, 데이터를 읽고, 더 나은 공간을 고민하는 도시계획·부동산 전공자입니다.",
    background: { image: "", video: "", color: "", opacity: 0.08 },

    profileName: "김민수",
    profileTitle: "단국대학교 도시계획부동산학부",
    profileSummary:
      "도시재생과 주택시장 분석에 관심이 많으며, 데이터와 현장을 함께 보려고 노력합니다. 팀 프로젝트와 동아리 활동을 통해 사람들과 협업하는 법을 배웠습니다.",
    profileImage: "",

    contact: [
      { label: "이메일", icon: "email", value: "example@naver.com" },
      { label: "전화", icon: "phone", value: "010-0000-0000" },
      { label: "거주지", icon: "location", value: "경기 용인시 수지구 죽전동" },
      { label: "GitHub / 블로그", icon: "link", value: "https://github.com/your-id" },
    ],

    skills: [
      {
        title: "도시·부동산 리서치",
        level: "상",
        description: "정책 자료, 통계, 논문 등을 조사하여 흐름을 정리하고 핵심 인사이트를 도출합니다.",
      },
      {
        title: "데이터 분석(입문)",
        level: "중",
        description: "엑셀과 기본 통계를 활용하여 실거래가, 인구구조 등 데이터를 정리·시각화합니다.",
      },
      {
        title: "협업 & 커뮤니케이션",
        level: "상",
        description: "동아리 임원 경험을 바탕으로 일정 조율, 회의 진행, 역할 분담에 익숙합니다.",
      },
    ],

    resume: {
      personal: [
        { label: "이름", value: "김민수" },
        { label: "생년월일", value: "2000.00.00" },
        { label: "주소", value: "경기 용인시 수지구 죽전동" },
        { label: "Email", value: "example@naver.com" },
      ],
      education: [
        {
          period: "2018.03 ~ 2021.02",
          title: "OO고등학교",
          subtitle: "인문계열",
        },
        {
          period: "2021.03 ~ 2027.02(졸업 예정)",
          title: "단국대학교 죽전캠퍼스",
          subtitle: "도시계획부동산학부",
        },
      ],
      experience: [
        {
          period: "2023.03 ~ 현재",
          title: "아이사랑 동아리 교육부장",
          description: "아동 교육 봉사 기획 및 운영, 신규 부원 온보딩, 교육 프로그램 커리큘럼 구성",
        },
        {
          period: "2024.03 ~ 2024.06",
          title: "도시·부동산 관련 팀 프로젝트",
          description: "주택시장·도시재생 이슈를 주제로 리포트 작성 및 발표",
        },
      ],
      activities: [
        {
          period: "2023.03 ~ 현재",
          title: "아이사랑 동아리",
          details: [
            "초등학생 대상 학습 지도 및 놀이 프로그램 진행",
            "부원 간 소통과 활동 일정 조율, 행사 기획 참여",
          ],
        },
        {
          period: "2024.09 ~ 2024.12",
          title: "전공 수업 프로젝트",
          details: [
            "서울시 특정 지역의 인구·상권 데이터 분석",
            "GIS를 활용한 시각화 및 발표 자료 제작",
          ],
        },
      ],
      certificates: [
        { date: "2024.00.00", name: "관심 있는 자격증 또는 준비 중인 시험을 입력하세요." },
      ],
    },

    projects: [
      {
        title: "서울 고덕동 아파트 실거래가 분석",
        period: "2023.09 ~ 2023.12",
        description:
          "국토부 실거래가 데이터를 활용하여 고덕동 주요 단지의 가격 추세와 9호선 연장, 비즈밸리 조성 등 개발 호재의 영향을 분석한 리포트입니다.",
        tags: ["#실거래가", "#아파트분석", "#고덕동"],
        coverImage: "",
        pdfName: "",
        pdfDataUrl: "",
      },
      {
        title: "한·일 고령사회 주거정책 비교",
        period: "2024.03 ~ 2024.06",
        description:
          "한국과 일본의 고령자 주거지원, 빈집 문제, 농촌 활성화 정책을 비교하여 시사점을 정리한 팀 발표 과제입니다.",
        tags: ["#고령사회", "#주거정책", "#비교연구"],
        coverImage: "",
        pdfName: "",
        pdfDataUrl: "",
      },
    ],
  }

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  useEffect(() => {
    const saved = getData("about-info") as Partial<AboutInfo> | null
    if (saved) {
      const merged: AboutInfo = {
        ...defaultInfo,
        ...saved,
        background: { ...defaultInfo.background, ...(saved.background || {}) },
        resume: { ...defaultInfo.resume, ...(saved.resume || {}) },
        projects: saved.projects || defaultInfo.projects,
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
        pdfDataUrl: "",
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

  // PDF 업로드 → base64로 저장
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

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      const newProjects = [...aboutInfo.projects]
      newProjects[index] = {
        ...newProjects[index],
        pdfDataUrl: result,
        pdfName: file.name,
      }
      updateAboutInfo("projects", newProjects)
    }
    reader.readAsDataURL(file)
  }

  const updateResume = (section: keyof Resume, index: number, field: string, value: string, detailIndex?: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))

    if (section === "activities" && typeof detailIndex === "number") {
      newResume.activities[index].details[detailIndex] = value
    } else {
      ;(newResume as any)[section][index][field] = value
    }

    updateAboutInfo("resume", newResume)
  }

  const getContactIcon = (icon: "email" | "phone" | "location" | "link") => {
    switch (icon) {
      case "email":
        return <Mail className="w-4 h-4" />
      case "phone":
        return <Phone className="w-4 h-4" />
      case "location":
        return <MapPin className="w-4 h-4" />
      case "link":
        return <LinkIcon className="w-4 h-4" />
      default:
        return null
    }
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
          {/* 상단 소개 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-stretch">
            {/* 프로필 + 요약 */}
            <Card className="border-0 shadow-lg">
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
                        onChange={(value) => updateAboutInfo("profileName", value)}
                        storageKey="about-profile-name"
                      />
                    </h1>
                    <p className="text-primary mt-1 font-medium">
                      <EditableText
                        value={aboutInfo.profileTitle}
                        onChange={(value) => updateAboutInfo("profileTitle", value)}
                        storageKey="about-profile-title"
                        multiline
                      />
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <EditableText
                      value={aboutInfo.profileSummary}
                      onChange={(value) => updateAboutInfo("profileSummary", value)}
                      storageKey="about-profile-summary"
                      multiline
                    />
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 연락처 + 핵심 스킬 요약 */}
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
                      <div key={idx} className="grid grid-cols-[80px_minmax(0,1fr)] gap-2 items-center">
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

              <Card className="border-0 shadow-md">
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                    KEY SKILLS
                  </h3>
                  <div className="space-y-3">
                    {aboutInfo.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          {skill.level === "상" && <Star className="w-4 h-4 text-primary" />}
                          {skill.level === "중" && <Target className="w-4 h-4 text-primary" />}
                          {skill.level === "하" && <Zap className="w-4 h-4 text-primary" />}
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
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              <EditableText
                                value={skill.level}
                                onChange={(value) => {
                                  const newSkills = [...aboutInfo.skills]
                                  newSkills[idx].level = value as any
                                  updateAboutInfo("skills", newSkills)
                                }}
                                storageKey={`skills-${idx}-level`}
                              />
                            </span>
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
                                updateResume("education", idx, "subtitle", value)
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
                                updateResume("experience", idx, "description", value)
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

                    {/* 표지 이미지 업로드 (EditableMedia 사용) */}
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-muted">
                      <EditableMedia
                        src={project.coverImage}
                        onChange={(src) => updateProject(index, "coverImage", src)}
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
                      {project.pdfDataUrl && (
                        <a
                          href={project.pdfDataUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          {project.pdfName || "PDF 보기"}
                        </a>
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
                            <p className="mt-1">현재 파일: {project.pdfName}</p>
                          )}
                          <p className="text-[10px]">
                            * 업로드한 PDF는 브라우저에 저장되어 이 페이지에서만 열 수 있습니다.
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
