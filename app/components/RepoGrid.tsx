'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
    Star,
    GitFork,
    CircleDot,
    GitBranch,
    Copy,
    Check,
    X,
    Users,
    Globe,
    Archive,
    Scale,
    Tag,
    CalendarDays,
    HardDrive,
    FolderGit2,
    Eye,
    ExternalLink
} from 'lucide-react';
import { Github } from '@/lib/icons';

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    clone_url: string;
    homepage: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    size: number;
    default_branch: string;
    created_at: string;
    updated_at: string;
    language: string | null;
    topics?: string[];
    visibility?: string;
    archived?: boolean;
    license?: {
        name: string;
    } | null;
    owner?: {
        login: string;
        avatar_url: string;
    };
}

export interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

interface RepoGridProps {
    repos: Repository[];
}

export default function RepoGrid({ repos }: RepoGridProps) {
    const t = useTranslations('openSourcePage');
    const locale = useLocale();
    const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loadingContributors, setLoadingContributors] = useState(false);
    const [contributorError, setContributorError] = useState(false);
    const [copied, setCopied] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);

    const handleOpenModal = useCallback(async (repo: Repository) => {
        lastFocusedElementRef.current = document.activeElement as HTMLElement;
        setSelectedRepo(repo);
        setLoadingContributors(true);
        setContributors([]);
        setContributorError(false);
        setCopied(false);

        try {
            const res = await fetch(`/api/contributors?repo=${repo.name}`);
            if (res.ok) {
                const data = await res.json();
                setContributors(data);
            } else {
                setContributorError(true);
            }
        } catch (error) {
            console.error('Contributors yüklenirken hata:', error);
            setContributorError(true);
        } finally {
            setLoadingContributors(false);
        }
    }, []);

    const closeModal = useCallback(() => {
        setSelectedRepo(null);
        setContributors([]);
        setContributorError(false);
        setCopied(false);
        // Restore focus to the card that opened the modal (WCAG 2.4.3)
        lastFocusedElementRef.current?.focus();
        lastFocusedElementRef.current = null;
    }, []);

    useEffect(() => {
        if (!selectedRepo) return;

        // Move focus into the dialog when it opens
        requestAnimationFrame(() => closeButtonRef.current?.focus());

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedRepo, closeModal]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (repos.length === 0) {
        return (
            <div className="owt-glass-simple flex flex-col items-center justify-center text-center py-20 px-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                    <FolderGit2 className="w-7 h-7 text-[#b8b8b8]" aria-hidden />
                </div>
                <p className="text-[#b8b8b8] font-medium text-sm sm:text-base">{t('noProjects')}</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {repos.map((repo) => (
                    <article
                        key={repo.id}
                        role="button"
                        tabIndex={0}
                        aria-label={repo.name}
                        onClick={() => handleOpenModal(repo)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleOpenModal(repo);
                            }
                        }}
                        className="group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer outline-none border border-white/8 bg-[#111] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-(--accent-cyan)/25 hover:shadow-[0_0_30px_-8px_var(--accent-cyan-muted)] focus-visible:ring-2 focus-visible:ring-(--accent-cyan)/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-(--accent-cyan)/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden
                        />

                        <div className="p-5 sm:p-6 flex flex-col flex-grow">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="min-w-0">
                                    <span className="text-[11px] text-[#737373] font-mono truncate block mb-1">
                                        {repo.full_name}
                                    </span>
                                    <h3 className="text-lg font-bold text-[#e8e8e8] group-hover:text-(--accent-cyan) transition-colors tracking-tight truncate" translate="no">
                                        {repo.name}
                                    </h3>
                                </div>
                                {repo.language && (
                                    <span className="shrink-0 px-2.5 py-1 text-[11px] font-semibold bg-(--accent-cyan)/10 text-(--accent-cyan) rounded-full border border-(--accent-cyan)/20" translate="no">
                                        {repo.language}
                                    </span>
                                )}
                            </div>

                            <p className="text-[#b8b8b8] text-sm leading-relaxed line-clamp-3 mb-5 font-medium flex-grow">
                                {repo.description || t('noDescription')}
                            </p>

                            {repo.topics && repo.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {repo.topics.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className="text-[10px] sm:text-[11px] font-medium bg-white/5 text-[#b8b8b8] px-2.5 py-1 rounded-lg border border-white/10"
                                            translate="no"
                                        >
                                            #{topic}
                                        </span>
                                    ))}
                                    {repo.topics.length > 3 && (
                                        <span className="text-[10px] sm:text-[11px] font-medium bg-white/[0.02] text-[#737373] px-2 py-1 rounded-lg border border-white/5">
                                            +{repo.topics.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#b8b8b8]">
                                        <Star className="w-3.5 h-3.5 text-(--accent-cyan)" aria-hidden />
                                        <span className="text-[#e8e8e8] font-semibold">{repo.stargazers_count}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#b8b8b8]">
                                        <GitFork className="w-3.5 h-3.5 text-(--accent-cyan)" aria-hidden />
                                        <span className="text-[#e8e8e8] font-semibold">{repo.forks_count}</span>
                                    </span>
                                </div>
                                <time dateTime={repo.updated_at} className="text-[11px] text-[#737373] font-medium">
                                    {new Date(repo.updated_at).toLocaleDateString(locale)}
                                </time>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {selectedRepo && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center overflow-hidden p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') closeModal();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedRepo.name}
                >
                    <div className="relative mt-auto mb-0 sm:mb-auto bg-[#111] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-3xl max-h-[90vh] sm:max-h-[92vh] overflow-y-auto overscroll-contain scrollbar_Cer45 shadow-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
                        <div className="sticky top-0 z-20 -mx-5 px-5 pt-5 sm:-mx-8 sm:px-8 sm:pt-6 pb-4 bg-[#111]/95 backdrop-blur-md border-b border-white/8">
                            <button
                                ref={closeButtonRef}
                                onClick={closeModal}
                                aria-label={t('close')}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 rounded-full text-[#b8b8b8] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan)"
                            >
                                <X className="w-4 h-4" aria-hidden />
                            </button>

                            <div className="pr-10 sm:pr-12">
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-(--accent-cyan) bg-(--accent-cyan)/10 px-3 py-1 rounded-full border border-(--accent-cyan)/20">
                                        <Eye className="w-3 h-3" aria-hidden />
                                        {t('projectLabel', { visibility: selectedRepo.visibility || 'Public' })}
                                    </span>
                                    {selectedRepo.license && (
                                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-[#b8b8b8] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            <Scale className="w-3 h-3" aria-hidden />
                                            {selectedRepo.license.name}
                                        </span>
                                    )}
                                    {selectedRepo.archived && (
                                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                            <Archive className="w-3 h-3" aria-hidden />
                                            {t('archived')}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2.5 mb-2">
                                    {selectedRepo.owner?.avatar_url && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={selectedRepo.owner.avatar_url}
                                            alt={selectedRepo.owner.login}
                                            className="w-7 h-7 rounded-full border border-white/10"
                                        />
                                    )}
                                    <span className="text-[11px] sm:text-xs text-[#737373] font-mono truncate">
                                        {selectedRepo.full_name}
                                    </span>
                                </div>

                                <h3 className="text-xl sm:text-3xl font-black text-[#e8e8e8] tracking-tight" translate="no">
                                    {selectedRepo.name}
                                </h3>
                                <p className="text-[#b8b8b8] text-xs sm:text-base mt-2 leading-relaxed font-medium line-clamp-3">
                                    {selectedRepo.description || t('noDescriptionModal')}
                                </p>
                            </div>
                        </div>

                        <div className="pt-5 sm:pt-6">

                        {selectedRepo.topics && selectedRepo.topics.length > 0 && (
                            <div className="mb-6">
                                <p className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#737373] font-bold mb-2.5 uppercase tracking-[0.15em]">
                                    <Tag className="w-3 h-3" aria-hidden />
                                    {t('topicsHeading')}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedRepo.topics.map((topic: string) => (
                                        <span
                                            key={topic}
                                            className="text-[11px] sm:text-xs font-medium bg-white/5 text-[#b8b8b8] px-2.5 py-1 rounded-lg border border-white/10"
                                            translate="no"
                                        >
                                            #{topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-3 sm:p-4 text-center hover:border-(--accent-cyan)/25 transition-colors">
                                <Star className="w-4 h-4 text-(--accent-cyan) mx-auto mb-1.5" aria-hidden />
                                <p className="text-[10px] sm:text-[11px] text-[#737373] font-medium uppercase tracking-wide">{t('starsWatch')}</p>
                                <p className="text-sm sm:text-lg font-bold text-[#e8e8e8] mt-0.5">{selectedRepo.stargazers_count}</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-3 sm:p-4 text-center hover:border-(--accent-cyan)/25 transition-colors">
                                <GitFork className="w-4 h-4 text-(--accent-cyan) mx-auto mb-1.5" aria-hidden />
                                <p className="text-[10px] sm:text-[11px] text-[#737373] font-medium uppercase tracking-wide">{t('forksCount')}</p>
                                <p className="text-sm sm:text-lg font-bold text-[#e8e8e8] mt-0.5">{selectedRepo.forks_count}</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-3 sm:p-4 text-center hover:border-(--accent-cyan)/25 transition-colors">
                                <CircleDot className="w-4 h-4 text-(--accent-cyan) mx-auto mb-1.5" aria-hidden />
                                <p className="text-[10px] sm:text-[11px] text-[#737373] font-medium uppercase tracking-wide">{t('openIssues')}</p>
                                <p className="text-sm sm:text-lg font-bold text-[#e8e8e8] mt-0.5">{selectedRepo.open_issues_count}</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-3 sm:p-4 text-center hover:border-(--accent-cyan)/25 transition-colors">
                                <GitBranch className="w-4 h-4 text-(--accent-cyan) mx-auto mb-1.5" aria-hidden />
                                <p className="text-[10px] sm:text-[11px] text-[#737373] font-medium uppercase tracking-wide">{t('defaultBranch')}</p>
                                <p className="text-sm sm:text-lg font-bold text-[#e8e8e8] mt-0.5 truncate" translate="no">{selectedRepo.default_branch}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 bg-white/[0.02] border border-white/5 rounded-2xl p-3 sm:p-4 text-xs text-[#b8b8b8]">
                            <div className="flex items-center gap-2.5">
                                <HardDrive className="w-4 h-4 text-(--accent-cyan) shrink-0" aria-hidden />
                                <div>
                                    <span className="text-[#737373] block text-[10px] uppercase tracking-wide">{t('repoSize')}</span>
                                    <span className="font-semibold text-[#e8e8e8]">{(selectedRepo.size / 1024).toFixed(2)} MB</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <CalendarDays className="w-4 h-4 text-(--accent-cyan) shrink-0" aria-hidden />
                                <div>
                                    <span className="text-[#737373] block text-[10px] uppercase tracking-wide">{t('createdAt')}</span>
                                    <span className="font-semibold text-[#e8e8e8]">{new Date(selectedRepo.created_at).toLocaleDateString(locale)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <CalendarDays className="w-4 h-4 text-(--accent-cyan) shrink-0" aria-hidden />
                                <div>
                                    <span className="text-[#737373] block text-[10px] uppercase tracking-wide">{t('updatedAt')}</span>
                                    <span className="font-semibold text-[#e8e8e8]">{new Date(selectedRepo.updated_at).toLocaleDateString(locale)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 bg-[#0d0d0d] border border-white/8 rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] sm:text-xs text-[#737373] font-bold uppercase tracking-[0.15em]">
                                    {t('cloneUrl')}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(selectedRepo.clone_url)}
                                    aria-label={copied ? t('copied') : t('copy')}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-cyan) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan) rounded"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5" aria-hidden />
                                            <span aria-live="polite">{t('copied')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" aria-hidden />
                                            {t('copy')}
                                        </>
                                    )}
                                </button>
                            </div>
                            <code className="block text-[11px] sm:text-xs text-[#b8b8b8] font-mono break-all bg-black/40 border border-white/5 rounded-xl p-2.5">
                                {selectedRepo.clone_url}
                            </code>
                        </div>

                        <div className="mb-6">
                            <h4 className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#e8e8e8] mb-4">
                                <Users className="w-4 h-4 text-(--accent-cyan)" aria-hidden />
                                {t('contributorsHeading')}
                            </h4>

                            {loadingContributors ? (
                                <div className="flex justify-center py-8" role="status" aria-live="polite">
                                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-(--accent-cyan)" aria-hidden />
                                    <span className="sr-only">{t('loading')}</span>
                                </div>
                            ) : contributorError ? (
                                <p className="text-xs sm:text-sm text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
                                    {t('contributorsError')}
                                </p>
                            ) : contributors.length === 0 ? (
                                <p className="text-xs sm:text-sm text-[#b8b8b8] bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                                    {t('noContributors')}
                                </p>
                            ) : (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 sm:max-h-60 overflow-y-auto pr-1 scrollbar_Cer45">
                                    {contributors.map((contributor) => (
                                        <li key={contributor.id || contributor.login}>
                                            <a
                                                href={contributor.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-(--accent-cyan)/30 hover:bg-(--accent-cyan)/5 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan)"
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={contributor.avatar_url}
                                                    alt={contributor.login}
                                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/10"
                                                />
                                                <div className="overflow-hidden min-w-0">
                                                    <p className="text-xs sm:text-sm font-semibold text-[#e8e8e8] group-hover:text-(--accent-cyan) transition-colors truncate" translate="no">
                                                        {contributor.login}
                                                    </p>
                                                    <p className="text-[11px] text-[#737373] font-medium">
                                                        {t('contributionsCount', { count: contributor.contributions })}
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-white/8">
                            {selectedRepo.homepage ? (
                                <a
                                    href={selectedRepo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border border-white/10 bg-white/5 text-[#e8e8e8] hover:bg-white/10 hover:border-(--accent-cyan)/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan)"
                                >
                                    <Globe className="w-3.5 h-3.5" aria-hidden />
                                    {t('liveSite')}
                                </a>
                            ) : <div />}

                            <div className="flex items-center gap-2.5">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#b8b8b8] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan) rounded-xl"
                                >
                                    {t('close')}
                                </button>
                                <a
                                    href={selectedRepo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative flex-1 sm:flex-none inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-3 bg-gradient-to-r from-(--accent-cyan) to-[#00b8d4] text-[#0a0a0a] font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-(--accent-cyan)/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-(--accent-cyan)/40 active:translate-y-0 active:scale-[0.98] text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan) focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                                >
                                    <span
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                                        aria-hidden
                                    />
                                    <Github className="relative w-4 h-4" aria-hidden />
                                    <span className="relative">{t('viewOnGithub')}</span>
                                    <ExternalLink className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
