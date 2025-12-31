"use client";

import { ArrowDown, ArrowUp, Command } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { getTasksAction } from "@/actions/get-tasks";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
	const [tasks, setTasks] = React.useState<any[]>([]);
	const [user, setUser] = React.useState<any | null>(null);
	const [search, setSearch] = React.useState("");
	const [sortAZ, setSortAZ] = React.useState(true);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		getTasksAction().then(({ user, tasks }) => {
			setUser(user);
			setTasks(tasks);
			setLoading(false);
		});
	}, []);

	const filteredTasks = tasks
		.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) =>
			sortAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
		);

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			{/* Icon Sidebar */}
			<Sidebar
				collapsible="none"
				className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
								<a href="/">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<Command className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">Acme Inc</span>
										<span className="truncate text-xs">Enterprise</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0"></SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				{user && (
					<SidebarFooter>
						<NavUser user={user} />
					</SidebarFooter>
				)}
			</Sidebar>

			{/* Main Sidebar */}
			<Sidebar collapsible="none" className="hidden flex-1 md:flex">
				<SidebarHeader className="gap-3.5 border-b p-4">
					<div className="flex w-full items-center justify-between">
						<div className="text-base font-medium text-foreground"></div>
						<div className="flex items-center gap-4">
							<Label className="flex items-center gap-2 text-sm">
								<span>Unreads</span>
								<Switch className="shadow-none" />
							</Label>
							<button
								type="button"
								className="flex items-center gap-1 text-sm text-foreground hover:text-foreground/80"
								onClick={() => setSortAZ(!sortAZ)}
							>
								Sort {sortAZ ? "A-Z" : "Z-A"}{" "}
								{sortAZ ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
							</button>
						</div>
					</div>
					<SidebarInput
						placeholder="Type to search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="px-0">
						<SidebarGroupContent>
							{loading
								? // Skeleton placeholders
									Array.from({ length: 10 }).map((_, i) => (
										<div
											key={i}
											className="animate-pulse flex flex-col gap-2 border-b p-4 last:border-b-0"
										>
											<div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
											<div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
											<div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
										</div>
									))
								: filteredTasks.map((task) => (
										<Link
											href={`?task_id=${task._id}`}
											key={task._id}
											className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
											shallow
										>
											<div className="flex w-full items-center gap-2">
												<span>{task.title}</span>{" "}
												<span className="ml-auto text-xs">
													{task.time_left}
												</span>
											</div>
											<span className="font-medium">{task.status}</span>
											<span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
												{task.description}
											</span>
										</Link>
									))}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	);
}
