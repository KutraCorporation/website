import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const repoName = searchParams.get('repo');

    if (!repoName) {
        return NextResponse.json({ error: 'Repo ismi gerekli' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.github.com/repos/KutraCorporation/${repoName}/contributors?per_page=100`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                // Eğer isterseniz buraya GitHub Token ekleyerek rate limit'i artırabilirsiniz:
                // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            },
            next: { revalidate: 3600 } // 1 saat önbellekle
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'GitHub API hatası' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}