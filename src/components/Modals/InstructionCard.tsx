import type React from "react";
import { Card, Typography, Space } from "antd";
import styles from "../../styles/InstructionCard.module.scss";

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
			className={styles["InstructionCard"]}
			cover={
				<IconComponent
					className={`${styles["cardIcon"]} ${isMobile ? styles["mobile"] : styles["desktop"]}`}
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
								className={`${styles["cardDescription"]} ${isMobile ? styles["mobile"] : styles["desktop"]}`}
							>
								{text}
							</Text>
						))}
					</Space>
				}
				title={
					<span
						className={`${styles["cardTitle"]} ${isMobile ? styles["mobile"] : styles["desktop"]}`}
					>
						{item.title}
					</span>
				}
			/>
		</Card>
	);
};

export default InstructionCard;
