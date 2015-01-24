#!/usr/bin/env ruby
# encoding: utf-8

require_relative 'robot'

puts 'Enter commands finishing with REPORT command:'

robot = Robot.new

while (cmd = gets).strip!
  if cmd =~ /^PLACE/
    cmd = [cmd.split[0]] + cmd.split[1].split(',')
    robot.command *cmd
  else
    robot.command cmd
  end

  break if cmd.eql?('REPORT')
end
