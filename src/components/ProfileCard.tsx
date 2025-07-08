'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Trophy,
  TrendingUp,
  Star,
  Edit3,
  Share2,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

import { Genome } from '@/types/genome';

interface ProfileCardProps {
  profile: Genome;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const name = profile.person.name;
  const professionalHeadline = profile.person.professionalHeadline;
  const profileImage = profile.person.picture;
  const location = profile.person.location?.name || 'Location not specified';
  const verified = profile.person.verified;
  const strengths = profile.strengths.slice(0, 6).map((s) => s.name);
  const totalStrengths = profile.stats.strengths;
  const links = profile.person.links;
  const summaryOfBio = profile.person.summaryOfBio;

  const percentile = Math.max(
    1,
    Math.min(100, Math.round(100 - profile.person.weight / 1000))
  );

  const skillLevels = profile.strengths.slice(0, 6).map((strength) => ({
    skill:
      strength.name.length > 12
        ? strength.name.substring(0, 12) + '...'
        : strength.name,
    level: Math.max(
      20,
      Math.min(100, strength.hits / 100 + Math.random() * 30 + 40)
    ),
  }));

  const getPercentileColor = (percentile: number) => {
    if (percentile <= 1) return 'text-amber-600 bg-amber-50';
    if (percentile <= 5) return 'text-emerald-600 bg-emerald-50';
    if (percentile <= 10) return 'text-blue-600 bg-blue-50';
    return 'text-slate-600 bg-slate-50';
  };

  const getPercentileIcon = (percentile: number) => {
    if (percentile <= 1) return <Trophy className="h-4 w-4" />;
    if (percentile <= 5) return <Star className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  return (
    <Card
      className="w-full max-w-md mx-auto transition-all duration-300 hover:shadow-lg border-0 shadow-sm bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 ring-2 ring-slate-100">
              <AvatarImage
                src={profileImage || '/default-avatar.svg'}
                alt={name}
              />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 truncate">
                  {name}
                </h3>
                {verified && (
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-wrap text-slate-400 pb-1.5 truncate">
                {professionalHeadline}
              </p>
              <p className="text-xs text-slate-500 truncate">{location}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div
          className={`rounded-lg p-4 border transition-all duration-300 ${getPercentileColor(
            percentile
          )} ${isHovered ? 'scale-105' : ''}`}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">{getPercentileIcon(percentile)}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Top {percentile}% User</p>
              <p className="text-xs opacity-80">
                You are performing better than {100 - percentile}% of users
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-700">
              Top Strengths
            </h4>
            <span className="text-xs text-slate-500">
              {totalStrengths} identified
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {strengths.slice(0, 4).map((strength, index) => (
              <Badge
                key={strength}
                variant="secondary"
                className={`text-xs transition-all duration-200 hover:scale-105 ${
                  index === 0
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : index === 1
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : index === 2
                    ? 'bg-purple-100 text-purple-700 border-purple-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {strength}
              </Badge>
            ))}
          </div>
        </div>
        {summaryOfBio && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700">About</h4>
            <p className="text-sm text-slate-600 line-clamp-3">
              {summaryOfBio.replace(/&#x27;/g, "'").replace(/&amp;/g, '&')}
            </p>
          </div>
        )}
        {links && links.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700">Links</h4>
            <div className="flex flex-wrap gap-2">
              {links.slice(0, 4).map((link) => (
                <Badge
                  key={link.id}
                  variant="outline"
                  className="text-xs hover:bg-slate-50 cursor-pointer"
                >
                  {link.name}
                </Badge>
              ))}
              {links.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{links.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-700">
              Skills Overview
            </h4>
            <span className="text-xs text-slate-500">0-100 scale</span>
          </div>
          <div className="relative">
            <ChartContainer
              config={{
                level: {
                  label: 'Skill Level',
                  color: 'hsl(217, 91%, 59%)',
                },
              }}
              className="h-48 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={skillLevels}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <PolarGrid
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    className="opacity-50"
                  />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    className="text-xs"
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 8, fill: '#94a3b8' }}
                    tickCount={5}
                  />
                  <Radar
                    name="Skill Level"
                    dataKey="level"
                    stroke="hsl(217, 91%, 59%)"
                    fill="hsl(217, 91%, 59%)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    dot={{ r: 3, fill: 'hsl(217, 91%, 59%)' }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(label) => `${label}`}
                    formatter={(value: number) => [`${value}%`, 'Skill Level']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Current Level</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <span>Target: 100%</span>
              </div>
            </div>
          </div>{' '}
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Profile Stats</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">
                {profile.stats.jobs}
              </div>
              <div className="text-xs text-slate-500">Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">
                {profile.stats.projects}
              </div>
              <div className="text-xs text-slate-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">
                {profile.stats.awards}
              </div>
              <div className="text-xs text-slate-500">Awards</div>
            </div>
          </div>
        </div>{' '}
        <div className="flex space-x-2 pt-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() =>
              window.open(
                `https://torre.ai/${profile.person.publicId}`,
                '_blank'
              )
            }
          >
            View Full Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
