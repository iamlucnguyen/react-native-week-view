import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { getFormattedDate, calculateDaysArray, isToday } from '../utils';
import styles from './Header.styles';

const getDayTextStyles = (numberOfDays) => {
	const fontSize = numberOfDays === 7 ? 12 : 14;
	return {
		fontSize,
	};
};

const Column = ({ column, numberOfDays, format, style }) => {
	const data = getFormattedDate(column, format).split(' ');
	const istoday = isToday(new Date(column));

	return (
		<View style={[styles.column, style]}>
			<Text style={[{ color: istoday ? "#0073b7" : style.color, fontWeight: "bold" }, getDayTextStyles(numberOfDays)]}>
				{data[0]}
			</Text>
			<Text style={[{ color: istoday ? "#0073b7" : style.color }, getDayTextStyles(numberOfDays)]}>
				{data[1]}
			</Text>
		</View>
	);
};

const Columns = ({ columns, numberOfDays, format, style }) => {
	return (
		<View style={styles.columns}>
			{columns.map((column) => {
				return (
					<Column
						style={style}
						key={column}
						column={column}
						numberOfDays={numberOfDays}
						format={format}
					/>
				);
			})}
		</View>
	);
};

const WeekViewHeader = ({ numberOfDays, initialDate, formatDate, style }) => {
	const columns = calculateDaysArray(initialDate, numberOfDays);
	return (
		<View style={styles.container}>
			{columns && (
				<Columns
					format={formatDate}
					columns={columns}
					numberOfDays={numberOfDays}
					style={style}
				/>
			)}
		</View>
	);
};

WeekViewHeader.propTypes = {
	numberOfDays: PropTypes.oneOf([1, 3, 5, 7]).isRequired,
	initialDate: PropTypes.string.isRequired,
	formatDate: PropTypes.string,
	style: PropTypes.object,
};

WeekViewHeader.defaultProps = {
	formatDate: 'MMM D',
};

export default React.memo(WeekViewHeader);
