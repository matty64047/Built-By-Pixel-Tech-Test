"use client";

import { AArrowDown, AArrowUp, Globe, Inbox, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type ComponentProps, useEffect, useState } from "react";
import { getTasksAction } from "@/actions/get-tasks";
import type { User as UserType } from "@/actions/get-user";
import { NavUser } from "@/components/nav-user";
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
	useSidebar,
} from "@/components/ui/sidebar";
import type {
	GetUserTaskListQueryResult,
	TaskListQueryResult,
} from "@/graphql/generated";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "./ui/badge";

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
	const [tasks, setTasks] = useState<TaskListQueryResult[]>([]);
	const [userTasks, setUserTasks] = useState<GetUserTaskListQueryResult[]>([]);
	const [user, setUser] = useState<UserType>();
	const [activeList, setActiveList] = useState<TaskListQueryResult[]>([]);
	const [search, setSearch] = useState("");
	const [sortAZ, setSortAZ] = useState(true);
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const sidebar = useSidebar();
	const searchParams = useSearchParams();
	const currentTaskId = searchParams.get("task_id");
	const isMobile = useIsMobile();

	useEffect(() => {
		getTasksAction().then(({ user, tasks, userTasks }) => {
			setUser(user);
			setTasks(tasks);
			setUserTasks(userTasks);
			setLoading(false);
			setActiveList(user ? userTasks : tasks);
		});
	}, []);

	useEffect(() => {
		if (!currentTaskId && activeList.length > 0) {
			router.push(`?task_id=${activeList[0]._id}`);
		}
	}, [currentTaskId, activeList, router]);

	const filteredTasks = activeList
		.filter(
			(task) =>
				task.title.toLowerCase().includes(search.toLowerCase()) &&
				(!statusFilter || task.status === statusFilter),
		)
		.sort((a, b) =>
			sortAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
		);

	const uniqueStatuses = Array.from(new Set(activeList.map((t) => t.status)));

	const renderTasks = () => {
		if (loading)
			return Array.from({ length: 10 }).map((_, i) => (
				<div
					key={i}
					className="animate-pulse flex flex-col gap-2 border-b p-4 last:border-b-0"
				>
					<div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
					<div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
					<div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
				</div>
			));

		if (filteredTasks.length === 0)
			return (
				<div className="flex flex-col items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
					<Inbox className="h-5 w-5" />
					<span>There are no tasks</span>
				</div>
			);

		return filteredTasks.map((task) => (
			<Link
				href={`?task_id=${task._id}`}
				onClick={() => isMobile && sidebar.toggleSidebar()}
				key={task._id}
				className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
			>
				<div className="flex w-full items-center gap-2">
					<span>{task.title}</span>
					<span className="ml-auto text-xs">{task.time_left}</span>
				</div>
				<span className="font-medium">{task.status}</span>
				<span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
					{task.description}
				</span>
			</Link>
		));
	};

	const renderStatusFilters = () => (
		<div className="flex flex-wrap gap-2 mt-2">
			<Badge
				variant={!statusFilter ? "default" : "outline"}
				className="cursor-pointer"
				onClick={() => setStatusFilter(null)}
			>
				All
			</Badge>
			{uniqueStatuses.map((status) => (
				<Badge
					key={status}
					variant={statusFilter === status ? "default" : "outline"}
					className="cursor-pointer"
					onClick={() => {
						router.push(`/tasks/${status}`);
						setStatusFilter(status);
					}}
				>
					{status}
				</Badge>
			))}
		</div>
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
					{isMobile && (
						<SidebarMenuItem>
							<SidebarInput
								placeholder="Type to search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</SidebarMenuItem>
					)}
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								{user && (
									<SidebarMenuItem>
										<SidebarMenuButton
											tooltip={{ children: "User Tasks", hidden: false }}
											onClick={() => setActiveList(userTasks)}
											isActive={activeList === userTasks}
											className="px-2.5 md:px-2"
										>
											<User />
											<span>User Tasks</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)}
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip={{ children: "Public Tasks", hidden: false }}
										onClick={() => setActiveList(tasks)}
										isActive={activeList === tasks}
										className="px-2.5 md:px-2"
									>
										<Globe />
										<span>Public Tasks</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{isMobile && (
						<SidebarGroup className="px-0">
							<SidebarGroupContent>{renderTasks()}</SidebarGroupContent>
						</SidebarGroup>
					)}
				</SidebarContent>

				{user && (
					<SidebarFooter>
						<NavUser user={user} />
					</SidebarFooter>
				)}
			</Sidebar>

			{/* Main Sidebar */}
			<Sidebar collapsible="none" className="hidden flex-1 md:flex">
				<SidebarHeader className="gap-3.5 border-b p-4 flex-col">
					<div className="flex w-full items-center justify-between">
						<div className="text-base font-medium text-foreground"></div>
						<button
							type="button"
							className="flex items-center gap-1 text-sm text-foreground hover:text-foreground/80"
							onClick={() => setSortAZ(!sortAZ)}
						>
							{sortAZ ? <AArrowUp /> : <AArrowDown />}
						</button>
					</div>

					<SidebarInput
						placeholder="Type to search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					{renderStatusFilters()}
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup className="px-0">
						<SidebarGroupContent>{renderTasks()}</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	);
}
