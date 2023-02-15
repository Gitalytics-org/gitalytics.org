#!/usr/bin/env python3

__credits__ = ["KOLO"]
__version_info__ = (0, 0, 1)
__version__ = '.'.join(str(_) for _ in __version_info__)
__maintainer__ = "KOLO"
__status__ = "Prototype"  # Prototype, Development, Production

import sys
import os
import logging
import logging.handlers
from subprocess import call
import datetime
import time

try:
    import config as cfg
except SyntaxError as err:
    print(f"There is a syntax error in config.py, probably around line {err.lineno}")
    print("Try to find it, or just delete config.py and restart the script to generate a new config file")
    raise err

class myLogger:

    def __init__(self):
        try:
            if "-v" in sys.argv or "--verbose" in sys.argv:
                self.verboseEnabled = True
            else:
                self.verboseEnabled = False
        except IndexError:
            self.verboseEnabled = False
        self.createLogFilesIfNecessary()
        # This section attaches a rotating file handler to the log file that will rotate the script if the maximum
        # file size is exceeded at the beginning of the script execution.
        self.logger = logging.getLogger()
        loghandler = logging.handlers.RotatingFileHandler(cfg.log_file, maxBytes=cfg.log_size * 1000, backupCount=5)
        errorloghandler = logging.handlers.RotatingFileHandler(cfg.error_log, maxBytes=cfg.log_size * 1000,
                                                               backupCount=5)
        f_formatter = logging.Formatter('%(message)s')
        loghandler.setFormatter(f_formatter)
        errorloghandler.setFormatter(f_formatter)
        self.logger.addHandler(errorloghandler)
        self.logger.addHandler(loghandler)
        self.logger.warning("\r\nStarting the script on the " + self.getTodaysDate())

    def createLogFilesIfNecessary(self):
        if not (os.path.isfile(cfg.log_file)):
            call(["touch", cfg.log_file])
        if not (os.path.isfile(cfg.error_log)):
            call(["touch", cfg.error_log])

    def getTodaysDate(self):
        return datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d')

    def getTS(self):
        return datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')

    def writeLogFile(self, message):
        logEntry = "[" + self.getTS() + "]" + message + "\r\n"
        with open(cfg.log_file, "a") as logger:
            logger.write(logEntry)

    def writeErrorLog(self, message):
        with open(cfg.error_log, "a") as errorLog:
            errorLog.write(message + "\r\n")

    def verbose(self, message):
        self.consoleLog(message)

    def writeErrorMsg(self, message):
        self.consoleLogRed(message)
        logEntry = "[" + self.getTS() + "]" + message
        self.writeErrorLog(logEntry)

    def logError(self, customer, message):
        message = "Error for Customer " + customer + ": " + message
        self.writeErrorMsg(message)

    def logErrorII(self, customer, sub_id, message):
        message = "Error for Customer " + customer + " subsystem_id = " + str(sub_id) + " : " + message
        self.writeErrorMsg(message)

    def logErrorWithSubID(self, customer, subID, message):
        message = "Error for %s (SUBSYSTEM_ID %s):%s" % customer, str(subID), message
        self.writeErrorMsg(message)

    def consoleLog(self, message):
        if self.verboseEnabled:
            print(("[" + self.getTS() + "]" + message))
        self.writeLogFile(message)

    def consoleLogGreen(self, message):
        if self.verboseEnabled:
            print(("[" + self.getTS() + "]" + '\033[32m' + message + '\033[0m'))
        self.writeLogFile(message)

    def consoleLogRed(self, message):
        if self.verboseEnabled:
            print(("[" + self.getTS() + "]" + '\033[91m' + message + '\033[0m'))
        self.writeLogFile(message)


def createLogFilesIfNecessary():
    if not (os.path.isfile(cfg.log_file)):
        call(["touch", cfg.log_file])
    if not (os.path.isfile(cfg.error_log)):
        call(["touch", cfg.error_log])