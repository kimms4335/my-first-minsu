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
    tag: "PORTFOLIO",
    tagline: "도시재생 기획가",
    name: "김민수",
    title: "개발보다 활용, 변화보다 지속",
    description: "지역의 일상 속 가능성을 찾아 지속 가능한 도시를 추구합니다.",
    profileImage: "/uploads/hero-profile-1763642616785.jpeg",
    right_profile_title: "PROFILE",
    right_name: "김민수",
    right_role: "단국대학교 도시계획·부동산학부",
    focus_label: "FOCUS",
    focus_text: "도시계획 · 도시재생",
    basedin_label: "GPA",
    basedin_text: "4.27 / 4.5",
    keywords_label: "KEYWORDS",
    keywords_text: "현장 조사 및 데이터 활용, 소프트웨어 활용(ArcGIS), 데이터 시각화, 공간적 패턴 분석",
    projectButton: "프로젝트 포트폴리오 보기",
  }

  const [heroInfo, setHeroInfo] = useState(defaultInfo)

  useEffect(() => {
    const saved = getData("hero-info-v2")
    if (saved) setHeroInfo({ ...defaultInfo, ...saved })
  }, [isEditMode])

  const update = (k: string, v: string) => {
    const newInfo = { ...heroInfo, [k]: v }
    setHeroInfo(newInfo)
    saveData("hero-info-v2", newInfo)
  }

  const scrollToProjects = () => {
    const target = document.querySelector("#projects")
    if (target) target.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <EditableBackground
      storageKey="hero-bg-v2"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <section id="hero" className="w-full flex items-center justify-center py-16">
        <div className="w-full max-w-6xl px-4">
          <div className="relative bg-background/80 backdrop-blur-xl border rounded-3xl shadow-2xl overflow-hidden">
            {/* 상단: PORTFOLIO 라벨 */}
            <div className="px-8 pt-8 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="inline-block h-[1px] w-6 bg-primary/60" />
                <EditableText
                  value={heroInfo.tag}
                  onChange={(v) => update("tag", v)}
                  storageKey="hero-v2-tag"
                />
              </div>

              <div className="text-[11px] text-muted-foreground/80 max-w-[220px] text-right">
                <EditableText
                  value={heroInfo.tagline}
                  onChange={(v) => update("tagline", v)}
                  storageKey="hero-v2-tagline"
                />
              </div>
            </div>

            {/* 본문 */}
            <div className="px-8 pb-8 lg:px-12 lg:pb-12">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
                {/* 왼쪽 텍스트 영역 */}
                <div className="flex-1 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <EditableText
                        value={heroInfo.tagline}
                        onChange={(v) => update("tagline", v)}
                        storageKey="hero-v2-tagline-2"
                      />
                    </p>

                    <h1 className="text-5xl font-semibold tracking-tight mb-3">
                      <EditableText
                        value={heroInfo.name}
                        onChange={(v) => update("name", v)}
                        storageKey="hero-v2-name"
                      />
                    </h1>

                    <p className="text-2xl font-medium text-muted-foreground mb-4">
                      <EditableText
                        value={heroInfo.title}
                        onChange={(v) => update("title", v)}
                        storageKey="hero-v2-title"
                      />
                    </p>

                    <p className="max-w-xl leading-relaxed text-muted-foreground">
                      <EditableText
                        value={heroInfo.description}
                        onChange={(v) => update("description", v)}
                        storageKey="hero-v2-description"
                        multiline
                      />
                    </p>
                  </div>

                  {/* 프로젝트 버튼 */}
                  <div className="mt-8 flex">
                    {heroInfo.projectButton && (
                      <Button onClick={scrollToProjects} size="lg" className="text-base">
                        <EditableText
                          value={heroInfo.projectButton}
                          onChange={(v) => update("projectButton", v)}
                          storageKey="hero-v2-projectButton"
                        />
                      </Button>
                    )}
                  </div>
                </div>

                {/* 오른쪽 프로필 카드 */}
                <div className="w-full max-w-xs lg:max-w-sm">
                  <div className="relative">
                    <div className="relative z-10 bg-card rounded-3xl border shadow-xl overflow-visible">
                      <div className="px-6 pt-6 pb-4 flex flex-col items-center">
                        <div className="w-40 h-40 rounded-2xl overflow-hidden bg-muted mb-4">
                          <EditableMedia
                            src={heroInfo.profileImage}
                            onChange={(v) => update("profileImage", v)}
                            type="image"
                            storageKey="hero-v2-profileImage"
                            className="w-full h-full object-cover"
                            alt="프로필"
                          />
                        </div>

                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1 max-w-[120px] text-center">
                          <EditableText
                            value={heroInfo.right_profile_title}
                            onChange={(v) => update("right_profile_title", v)}
                            storageKey="hero-v2-right_profile_title"
                          />
                        </p>

                        <p className="text-lg font-semibold max-w-[160px] text-center">
                          <EditableText
                            value={heroInfo.right_name}
                            onChange={(v) => update("right_name", v)}
                            storageKey="hero-v2-right_name"
                          />
                        </p>

                        <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-[200px] text-center leading-relaxed">
                          <EditableText
                            value={heroInfo.right_role}
                            onChange={(v) => update("right_role", v)}
                            storageKey="hero-v2-right_role"
                            multiline
                          />
                        </p>

                        {/* Divider */}
                        <div className="w-full border-t my-4" />

                        {/* Focus + Based in */}
                        <div className="grid grid-cols-2 gap-3 w-full text-sm">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground max-w-[80px]">
                              <EditableText
                                value={heroInfo.focus_label}
                                onChange={(v) => update("focus_label", v)}
                                storageKey="hero-v2-focus_label"
                              />
                            </div>
                            <div className="font-medium max-w-[160px] relative z-20 pointer-events-auto">
                              <EditableText
                                value={heroInfo.focus_text}
                                onChange={(v) => update("focus_text", v)}
                                storageKey="hero-v2-focus_text"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground max-w-[80px]">
                              <EditableText
                                value={heroInfo.basedin_label}
                                onChange={(v) => update("basedin_label", v)}
                                storageKey="hero-v2-basedin_label"
                              />
                            </div>
                            <div className="font-medium max-w-[160px] relative z-20 pointer-events-auto">
                              <EditableText
                                value={heroInfo.basedin_text}
                                onChange={(v) => update("basedin_text", v)}
                                storageKey="hero-v2-basedin_text"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Keywords */}
                        <div className="mt-4 w-full">
                          <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1 max-w-[120px]">
                            <EditableText
                              value={heroInfo.keywords_label}
                              onChange={(v) => update("keywords_label", v)}
                              storageKey="hero-v2-keywords_label"
                            />
                          </div>

                          <div className="text-xs leading-relaxed text-muted-foreground max-w-full">
                            <EditableText
                              value={heroInfo.keywords_text}
                              onChange={(v) => update("keywords_text", v)}
                              storageKey="hero-v2-keywords_text"
                              multiline
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 오른쪽 카드 끝 */}
              </div>
            </div>

            {/* 스크롤 인디케이터 */}
            <div className="flex justify-center mt-8 mb-4">
              <ArrowDown className="w-5 h-5 animate-bounce text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>
    </EditableBackground>
  )
}
