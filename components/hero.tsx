"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

export function Hero() {
  const { getData, saveData, isEditMode } = useInlineEditor()
  
  const defaultInfo = {
    greeting: "도시재생 기획가",
    name: "김민수",
    title: "개발보다 활용, 변화보다 지속",
    description: "지역의 일상 속 가능성을 찾아 지속 가능한 도시를 추구합니다.",
    profileImage: "/uploads/hero-profile-1763642616785.jpeg",
    backgroundImage: "",
    backgroundVideo: "",
    backgroundOpacity: 0.1,
    projectButton: "프로젝트 보기",
    background: {"image":"","video":"","color":"","opacity":0.1}
  }

  const [backgroundData, setBackgroundData] =
    useState<{ image: string; video: string; color: string; opacity: number } | null>(null)
  const [heroInfo, setHeroInfo] = useState(defaultInfo)

  // localStorage에서 데이터 로드 - 편집 모드가 변경될 때마다 실행
  useEffect(() => {
    const savedData = getData("hero-info") as typeof defaultInfo | null
    if (savedData) {
      setHeroInfo({ ...defaultInfo, ...savedData })
    }

    const savedBg = getData("hero-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [isEditMode])

  const updateHeroInfo = (key: string, value: string) => {
    const newInfo = {
      ...heroInfo,
      [key]: value,
    }
    setHeroInfo(newInfo)
    saveData("hero-info", newInfo)
  }

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <EditableBackground
      image={backgroundData?.image || ""}
      video={backgroundData?.video || ""}
      color={backgroundData?.color || ""}
      opacity={backgroundData?.opacity || 0.1}
      onChange={(data) => {
        const newData = {
          image: backgroundData?.image || "",
          video: backgroundData?.video || "",
          color: backgroundData?.color || "",
          opacity: backgroundData?.opacity || 0.1,
          ...data,
        }
        setBackgroundData(newData)
        saveData("hero-background", newData)

        const updatedHeroInfo = { ...heroInfo, background: newData }
        setHeroInfo(updatedHeroInfo)
        saveData("hero-info", updatedHeroInfo)
      }}
      storageKey="hero-background"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <section id="hero" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 내용 */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-2">
                <EditableText
                  value={heroInfo.greeting}
                  onChange={(value) => updateHeroInfo("greeting", value)}
                  storageKey="hero-greeting"
                />
              </h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <EditableText
                  value={heroInfo.name}
                  onChange={(value) => updateHeroInfo("name", value)}
                  storageKey="hero-name"
                />
              </h1>
              <p className="text-2xl mb-4 text-muted-foreground">
                <EditableText
                  value={heroInfo.title}
                  onChange={(value) => updateHeroInfo("title", value)}
                  storageKey="hero-title"
                />
              </p>
              <p className="text-lg mb-8 text-muted-foreground">
                <EditableText
                  value={heroInfo.description}
                  onChange={(value) => updateHeroInfo("description", value)}
                  storageKey="hero-description"
                  multiline
                />
              </p>

              {/* 프로젝트 보기 버튼 */}
              <div className="mb-8">
                {isEditMode ? (
                  <div className="flex flex-col gap-2 w-fit">
                    <input
                      type="text"
                      value={heroInfo.projectButton}
                      onChange={(e) => updateHeroInfo("projectButton", e.target.value)}
                      placeholder="프로젝트 버튼 텍스트"
                      className="px-3 py-2 border rounded-lg bg-background text-sm text-center"
                    />
                    <Button onClick={scrollToProjects} size="lg" disabled className="justify-center">
                      {heroInfo.projectButton || "프로젝트 보기"}
                    </Button>
                  </div>
                ) : (
                  heroInfo.projectButton && (
                    <Button onClick={scrollToProjects} size="lg" className="justify-center">
                      {heroInfo.projectButton}
                    </Button>
                  )
                )}
              </div>

              {/* ⬇️ 소셜 링크 부분은 전부 제거됨 */}
            </div>

            {/* 오른쪽: 프로필 이미지 */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-muted overflow-hidden shadow-2xl">
                  <EditableMedia
                    src={heroInfo.profileImage}
                    onChange={(src) => updateHeroInfo("profileImage", src)}
                    type="image"
                    storageKey="hero-profileImage"
                    className="w-full h-full object-contain"
                    alt="프로필"
                    purpose="hero-profile"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </section>
    </EditableBackground>
  )
}
