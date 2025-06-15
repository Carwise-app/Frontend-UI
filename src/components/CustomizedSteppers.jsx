import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#dc143c',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#dc143c',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles?.('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: ownerState.active || ownerState.completed ? '#dc143c' : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: '#dc143c',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: `2px solid ${ownerState.active || ownerState.completed ? '#dc143c' : '#eaeaf0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'white'
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className, icon } = props;
  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle">{icon}</div>
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};



export default function CustomizedSteppers({ activeStep, allSteps}) {
  const visibleSteps = allSteps.slice(
    Math.max(0, activeStep - 1),
    Math.min(allSteps.length, activeStep + 2)
  );

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        nonLinear
      >
        {visibleSteps.map((label, index) => {
          const actualStepIndex = index + Math.max(0, activeStep - 1);
          return (
            <Step key={label} active={actualStepIndex === activeStep} completed={false}>
              <StepLabel StepIconComponent={(props) => <QontoStepIcon {...props} icon={actualStepIndex + 1} />}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
}

CustomizedSteppers.propTypes = {
  activeStep: PropTypes.number.isRequired,
};
