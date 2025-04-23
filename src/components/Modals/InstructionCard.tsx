import type React from "react";
import { Card, Typography, Space } from "antd";

const { Text } = Typography;

interface Instruction {
	icon: React.ElementType;
	color: string;
	title: string;
	desc: Array<string>;
}

const InstructionCard: React.FC<{ item: Instruction; isMobile: boolean }> = ({
	item,
	isMobile,
}) => {
	const IconComponent = item.icon;

	return (
		<Card
			hoverable
			className="transition-all hover:shadow-md"
			cover={
				<IconComponent
					className={`text-[48px] mt-6 ${isMobile ? 'text-[20px]' : 'text-[18px]'}`}
					style={{ color: item.color }}
				/>
			}
		>
			<Card.Meta
				description={
					<Space direction="vertical">
						{item.desc.map((text: string, index: number) => (
							<Text
								key={index}
								className={`${isMobile ? 'text-[16px]' : 'text-[14px]'}`}
							>
								{text}
							</Text>
						))}
					</Space>
				}
				title={
					<span
						className={`font-medium ${isMobile ? 'text-[20px]' : 'text-[18px]'}`}
					>
						{item.title}
					</span>
				}
			/>
		</Card>
	);
};

export default InstructionCard;
